import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  ChatMessagesHistory,
  ChatMessagesHistoryDocument,
} from './schemas/chat-messages-history.shema';
import { Model } from 'mongoose';
import { MessageDto } from './dto/message.dto';
import { ConversationService } from 'src/conversation/conversation.service';
import { User } from 'src/user/entities/user.entity';
import { AccountService } from 'src/account/account.service';
import { Dialog } from './schemas/dialog.schema';
import { MessageContent } from './schemas/message-content.shema';
import { Account } from 'src/account/entities/account.entity';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(ChatMessagesHistory.name)
    private chatMessagesHistoryModel: Model<ChatMessagesHistory>,
    @InjectModel(Dialog.name)
    private dialogModel: Model<Dialog>,
    private conversationService: ConversationService,
    private accountService: AccountService,
  ) {}

  async sendMessageToConversation(
    id: string,
    messageDto: MessageDto,
    user: User,
  ): Promise<ChatMessagesHistory | Dialog> {
    const { text, date } = messageDto;

    const conversation = await this.conversationService.getConversationById(id);

    const account = await this.accountService.getAccount(user);

    const message = this.getMessageContent(account, text, date);

    const isExistChatMessagesHistory =
      await this.chatMessagesHistoryModel.findOne({
        chatId: conversation.id,
      });

    if (!isExistChatMessagesHistory) {
      return this.createMessageHistory(message, conversation.id, date);
    }

    return this.sendMessage(date, message, isExistChatMessagesHistory);
  }

  private getMessageContent(
    account: Account,
    text: string,
    date: string,
  ): MessageContent {
    const messageContent: MessageContent = {
      accountId: account.id,
      nickname: account.nickname,
      text: text,
      time: date,
    };

    return messageContent;
  }

  private async createMessageHistory(
    message: MessageContent,
    chatId: string,
    date: string,
  ): Promise<ChatMessagesHistory> {
    const dialog = await this.dialogModel.create({
      dialogDate: this.getDialogDate(date),
      content: [message],
    });

    const history = await this.chatMessagesHistoryModel.create({
      chatId: chatId,
      history: [
        {
          dialogDate: this.getDialogDate(date),
          dialogId: dialog._id,
        },
      ],
    });

    return history;
  }

  private async sendMessage(
    date: string,
    message: MessageContent,
    isExistChatMessagesHistory: ChatMessagesHistoryDocument,
  ): Promise<Dialog | ChatMessagesHistory> {
    const dialog = await this.dialogModel.findOne({
      dialogDate: this.getDialogDate(date),
    });

    if (!dialog) {
      const newDialog = await this.dialogModel.create({
        dialogDate: this.getDialogDate(date),
        content: [message],
      });

      isExistChatMessagesHistory.history.push({
        dialogDate: this.getDialogDate(date),
        dialogId: newDialog._id,
      });

      return await isExistChatMessagesHistory.save();
    }

    dialog.content.push(message);

    return await dialog.save();
  }

  private getDialogDate(date: string): string {
    const messageDate = new Date(Number(date));

    const day = messageDate.getDate();
    const month = messageDate.getMonth() + 1;
    const year = messageDate.getFullYear();

    return `${day}:${month}:${year}`;
  }
}
