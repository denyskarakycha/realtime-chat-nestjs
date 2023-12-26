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
    const members = [sender, recipient];

    const direct = this.create({
      members,
    });

    return await this.save(direct);
  }

  async findDirectByAccount(sender: Account): Promise<Direct> {
    const direct = await this.findOne({
      where: { members: { id: sender.id } },
    });

    return direct;
  }
}
