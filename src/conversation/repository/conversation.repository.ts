import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Conversation } from '../entities/conversation.entity';
import { DataSource, Repository } from 'typeorm';
import { Account } from 'src/account/entities/account.entity';

@Injectable()
export class ConversationRepository extends Repository<Conversation> {
  constructor(private dataSource: DataSource) {
    super(Conversation, dataSource.createEntityManager());
  }

  async getConversations(title: string): Promise<Conversation[]> {
    const query = this.createQueryBuilder('conversation');
    if (title) {
      query.where({ title });
    }

    query.leftJoinAndSelect('conversation.creator', 'creator');
    query.leftJoinAndSelect('conversation.participans', 'participans');

    return await query.getMany();
  }

  async getConversationById(
    account: Account,
    id: string,
  ): Promise<Conversation> {
    const conversation = await this.findOne({
      where: {
        id,
        participans: account,
      },
      relations: ['creator', 'participans'],
    });

    if (!conversation) {
      throw new NotFoundException('Conversation not found');
    }

    return conversation;
  }

  async getConversationByAccount(account: Account): Promise<Conversation> {
    const conversation = await this.findOne({
      where: {
        participans: account,
      },
    });

    return conversation;
  }

  async createConversation(
    title: string,
    account: Account,
  ): Promise<Conversation> {
    try {
      const conversation = this.create({
        title,
        creator: account,
        participans: [account],
      });
      return await this.save(conversation);
    } catch (err) {
      if (err.code === '23505') {
        throw new ConflictException('Chat already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async getParticipans(account: Account, id: string): Promise<Account[]> {
    const conversation = await this.findOne({
      where: {
        id,
        participans: account,
      },
      relations: ['participans'],
    });

    if (!conversation) {
      throw new NotFoundException('Conversation not found');
    }

    return conversation.participans;
  }

  async addAccount(account: Account, id: string): Promise<Conversation> {
    const conversation = await this.findOne({
      where: { id },
      relations: ['creator', 'participans'],
    });

    const isAccountInConversation = conversation.participans.some(
      (participant) => participant.id === account.id,
    );

    if (isAccountInConversation) {
      throw new ConflictException('Account already exists in this chat');
    }

    conversation.participans.push(account);

    return await this.save(conversation);
  }
}
