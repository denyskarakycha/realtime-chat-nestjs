import { Injectable, NotFoundException } from '@nestjs/common';
import { Conversation } from '../entities/conversation.entity';
import { DataSource, Repository } from 'typeorm';
import { Account } from 'src/account/entities/account.entity';

@Injectable()
export class ConversationRepository extends Repository<Conversation> {
  constructor(private dataSource: DataSource) {
    super(Conversation, dataSource.createEntityManager());
  }

  async getConversations(title: string) {
    const query = this.createQueryBuilder('conversation');
    query.where({ title });

    return await query.getMany();
  }

  async createConversation(
    title: string,
    account: Account,
  ): Promise<Conversation> {
    const conversation = this.create({
      title,
      creator: account,
      participans: [account],
    });

    return await this.save(conversation);
  }

  async getParticipans(id: string): Promise<Account[]> {
    const conversation = await this.findOne({
      where: { id },
      relations: ['participans'],
    });

    if (!conversation) {
      throw new NotFoundException('Conversation not exist');
    }

    return conversation.participans;
  }

  async addAccount(account: Account, id: string): Promise<Conversation> {
    const conversation = await this.findOne({
      where: { id },
      relations: ['creator', 'participans'],
    });

    conversation.participans.push(account);

    return await this.save(conversation);
  }
}
