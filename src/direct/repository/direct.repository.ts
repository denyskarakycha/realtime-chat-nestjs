import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Direct } from '../entities/direct.entity';
import { Account } from 'src/account/entities/account.entity';

@Injectable()
export class DirectRepository extends Repository<Direct> {
  constructor(private dataSource: DataSource) {
    super(Direct, dataSource.createEntityManager());
  }

  async createDirect(sender: Account, recipient: Account): Promise<Direct> {
    const direct = this.create({
      members: [sender, recipient],
    });

    return await this.save(direct);
  }

  async findDirectByAccounts(
    sender: Account,
    recipient: Account,
  ): Promise<Direct | null> {
    const direct = await this.createQueryBuilder('direct')
      .innerJoin('direct.members', 'sender', 'sender.id = :senderId', {
        senderId: sender.id,
      })
      .innerJoin('direct.members', 'recipient', 'recipient.id = :recipientId', {
        recipientId: recipient.id,
      })
      .where('sender.id = :senderId AND recipient.id = :recipientId', {
        senderId: sender.id,
        recipientId: recipient.id,
      })
      .getOne();

    return direct;
  }

  async getDirects(account: Account): Promise<Direct[]> {
    const directs = await this.find({
      where: { members: account },
      relations: ['members'],
    });

    return directs;
  }

  async getDirectById(account: Account, id: string) {
    const directs = await this.findOne({
      where: { id: id, members: account },
    });

    return directs;
  }
}
