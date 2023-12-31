import { Injectable } from '@nestjs/common';
import { ConversationRepository } from './repository/conversation.repository';
import { Conversation } from './entities/conversation.entity';
import { Account } from 'src/account/entities/account.entity';

@Injectable()
export class ConversationService {
  constructor(private conversationRepository: ConversationRepository) {}

  getConversations(title: string): Promise<Conversation[]> {
    return this.conversationRepository.getConversations(title);
  }

  getConversationById(account: Account, id: string): Promise<Conversation> {
    return this.conversationRepository.getConversationById(account, id);
  }

  createConversation(title: string, account: Account): Promise<Conversation> {
    return this.conversationRepository.createConversation(title, account);
  }

  addAccount(account: Account, id: string): Promise<Conversation> {
    return this.conversationRepository.addAccount(account, id);
  }

  getParticipans(account: Account, id: string): Promise<Account[]> {
    return this.conversationRepository.getParticipans(account, id);
  }
}
