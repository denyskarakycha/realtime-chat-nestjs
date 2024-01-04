import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConversationService } from 'src/conversation/conversation.service';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { Conversation } from 'src/conversation/entities/conversation.entity';
import { User } from 'src/user/entities/user.entity';
import { AccountService } from 'src/account/account.service';
import { Account } from 'src/account/entities/account.entity';
import { GetConversationFilterDto } from './dto/get-conversations-filter.dto';
import { DirectService } from 'src/direct/direct.service';
import { Direct } from 'src/direct/entities/direct.entity';
import { Chat } from 'src/messages/enums/chat.enum';

@Injectable()
export class ChatService {
  constructor(
    private conversationServise: ConversationService,
    private directService: DirectService,
    private accountservice: AccountService,
  ) {}

  getConversations(
    getConversationFilterDto: GetConversationFilterDto,
  ): Promise<Conversation[]> {
    const { title } = getConversationFilterDto;

    return this.conversationServise.getConversations(title);
  }

  async getConversation(user: User, id: string): Promise<Conversation> {
    const account = await this.accountservice.getAccount(user);
    return this.conversationServise.getConversationById(account, id);
  }

  async getConversationParticipans(user: User, id: string): Promise<Account[]> {
    const account = await this.accountservice.getAccount(user);

    return this.conversationServise.getParticipans(account, id);
  }

  async getChat(
    account: Account,
    id: string,
    chatType: Chat,
  ): Promise<Conversation | Direct> {
    let chat = null;
    if (chatType === Chat.DIRECT) {
      chat = await this.directService.getDirectById(account, id);
    }
    if (chatType === Chat.CONVERSATION) {
      chat = await this.conversationServise.getConversationById(account, id);
    }
    if (!chat) {
      throw new ConflictException('You are not logged in to this chat');
    }

    return chat;
  }

  async createConvesation(
    createConversationDto: CreateConversationDto,
    user: User,
  ): Promise<Conversation> {
    const { title } = createConversationDto;

    const account = await this.accountservice.getAccount(user);

    if (!account) {
      throw new UnauthorizedException('Check your login credentials');
    }

    return this.conversationServise.createConversation(title, account);
  }

  async addAccountToConversation(
    id: string,
    user: User,
  ): Promise<Conversation> {
    const account = await this.accountservice.getAccount(user);

    return this.conversationServise.addAccount(account, id);
  }

  async getDirects(user: User): Promise<Direct[]> {
    const account = await this.accountservice.getAccount(user);

    return this.directService.getDirects(account);
  }

  async createDirect(user: User, recipientId: string): Promise<Direct> {
    const sender = await this.accountservice.getAccount(user);
    const recipient = await this.accountservice.getAccountById(recipientId);

    const isExistDirect = await this.directService.getDirectByAccounts(
      sender,
      recipient,
    );

    if (isExistDirect) {
      throw new ConflictException('Direct exists!');
    }

    return this.directService.createDirect(sender, recipient);
  }
}
