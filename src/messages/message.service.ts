import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  ChatMessagesHistory,
  ChatMessagesHistoryDocument,
} from './schemas/chat-messages-history.shema';
import { Model } from 'mongoose';
import { MessageDto } from './dto/message.dto';
import { User } from 'src/user/entities/user.entity';
import { AccountService } from 'src/account/account.service';
import { Dialog } from './schemas/dialog.schema';
import { MessageContent } from './schemas/message-content.shema';
import { Account } from 'src/account/entities/account.entity';
import { DateService } from './utils/date.service';
import { MessageQueryDto } from './dto/message-query.dto';
import { ChatService } from 'src/chat/chat.service';
import { HistoryQueryDto } from './dto/history-query.dto';
import { DialogQueryDto } from './dto/dialogs-query.dto';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(ChatMessagesHistory.name)
    private chatMessagesHistoryModel: Model<ChatMessagesHistory>,
    @InjectModel(Dialog.name)
    private dialogModel: Model<Dialog>,
    private chatService: ChatService,
    private accountService: AccountService,
    private dateService: DateService,
  ) {}

  async getChatMessagesHistory(
    id: string,
    user: User,
    historyQueryDto: HistoryQueryDto,
  ): Promise<ChatMessagesHistory> {
    const { chatType } = historyQueryDto;
    const account = await this.accountService.getAccount(user);
    const chat = await this.chatService.getChat(account, id, chatType);

    const сhatMessagesHistory = await this.chatMessagesHistoryModel
      .findOne({
        chatId: chat.id,
      })
      .populate('history.dialog')
      .exec();

    if (!сhatMessagesHistory) {
      throw new NotFoundException('History not found');
    }

    return сhatMessagesHistory;
  }

  async getDialogs(
    id: string,
    user: User,
    dialogQueryDto: DialogQueryDto,
  ): Promise<Dialog[]> {
    const { chatType, searchDate } = dialogQueryDto;
    const account = await this.accountService.getAccount(user);
    const chat = await this.chatService.getChat(account, id, chatType);

    const { start, end } = this.dateService.getPaginationDate(searchDate);

    const dialogs: Dialog[] = await this.dialogModel.find({
      chatId: chat.id,
      dialogDate: {
        $gte: start,
        $lte: end,
      },
    });

    if (!dialogs) {
      throw new NotFoundException('Dialogs not found');
    }

    return dialogs;
  }

  async sendMessageToChat(
    id: string,
    messageDto: MessageDto,
    user: User,
    messageQueryDto: MessageQueryDto,
  ): Promise<ChatMessagesHistory | Dialog> {
    const { text } = messageDto;
    const { chatType, date } = messageQueryDto;
    const isValidateDate = this.dateService.getValidateDate(date);
    if (!isValidateDate) {
      throw new ForbiddenException("Not today's date");
    }

    const account = await this.accountService.getAccount(user);

    const chat = await this.chatService.getChat(account, id, chatType);
    const message = this.getMessageContent(account, text);

    const isExistChatMessagesHistory =
      await this.chatMessagesHistoryModel.findOne({
        chatId: chat.id,
      });

    console.log(isExistChatMessagesHistory);

    if (!isExistChatMessagesHistory) {
      return this.createMessageHistory(message, chat.id, date);
    }

    return this.sendMessage(date, message, isExistChatMessagesHistory);
  }

  private getMessageContent(account: Account, text: string): MessageContent {
    const messageContent: MessageContent = {
      accountId: account.id,
      nickname: account.nickname,
      text: text,
    };

    return messageContent;
  }

  private async createMessageHistory(
    message: MessageContent,
    chatId: string,
    date: string,
  ): Promise<ChatMessagesHistory> {
    const dialog = await this.dialogModel.create({
      dialogDate: date,
      chatId: chatId,
      content: [message],
    });

    const history = await this.chatMessagesHistoryModel.create({
      chatId: chatId,
      history: [
        {
          dialog: dialog,
        },
      ],
    });

    return history.populate('history.dialog');
  }

  private async sendMessage(
    date: string,
    message: MessageContent,
    isExistChatMessagesHistory: ChatMessagesHistoryDocument,
  ): Promise<Dialog | ChatMessagesHistory> {
    const dialog = await this.dialogModel.findOne({
      dialogDate: date,
      chatId: isExistChatMessagesHistory.chatId,
    });

    if (!dialog) {
      const newDialog = await this.dialogModel.create({
        dialogDate: date,
        chatId: isExistChatMessagesHistory.chatId,
        content: [message],
      });

      isExistChatMessagesHistory.history.push({ dialog: newDialog._id });

      return await isExistChatMessagesHistory.save();
    }

    dialog.content.push(message);

    return await dialog.save();
  }
}
