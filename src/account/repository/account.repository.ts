import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Account } from '../entities/account.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class AccountRepository extends Repository<Account> {
  constructor(private dataSource: DataSource) {
    super(Account, dataSource.createEntityManager());
  }

  async createAccount(user: User): Promise<void> {
    const account = this.create({
      user,
    });

    await this.save(account);
  }
}
