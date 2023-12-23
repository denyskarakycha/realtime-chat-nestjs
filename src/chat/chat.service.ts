import { Injectable } from '@nestjs/common';
import { ConversationService } from 'src/conversation/conversation.service';
import { ConversationDto } from './dto/conversation.dto';
import { Conversation } from 'src/conversation/entities/conversation.entity';
import { User } from 'src/user/entities/user.entity';
import { AccountService } from 'src/account/account.service';
import { Account } from 'src/account/entities/account.entity';
import { GetConversationFilterDto } from './dto/get-conversations-filter.dto';

@Injectable()
export class ChatService {
  constructor(
    private conversationServise: ConversationService,
    private accountservice: AccountService,
  ) {}

  getConversations(
    getConversationFilterDto: GetConversationFilterDto,
  ): Promise<Conversation[]> {
    const { title } = getConversationFilterDto;

    return this.conversationServise.getConversations(title);
  }

  getConversationParticipans(id: string): Promise<Account[]> {
    return this.conversationServise.getParticipans(id);
  }

  async createConvesation(
    conversationDto: ConversationDto,
    user: User,
  ): Promise<Conversation> {
    const { title } = conversationDto;

    const account = await this.getAccount(user);

    return this.conversationServise.createConversation(title, account);
  }

  async addAccountToConversation(
    id: string,
    user: User,
  ): Promise<Conversation> {
    const account = await this.getAccount(user);

    return this.conversationServise.addAccount(account, id);
  }

  private async getAccount(user: User): Promise<Account> {
    const account = await this.accountservice.getAccount(user);

    return account;
  }
}
