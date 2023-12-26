import { DataSource, Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Account } from '../entities/account.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class AccountRepository extends Repository<Account> {
  constructor(private dataSource: DataSource) {
    super(Account, dataSource.createEntityManager());
  }

  async findAccount(user: User): Promise<Account> {
    const account = await this.findOneBy({ user });

    return account;
  }

  async findAccountById(id: string): Promise<Account> {
    const account = await this.findOneBy({ id });

    if (!account) {
      throw new NotFoundException('User not exist');
    }

    return account;
  }

  async createAccount(user: User, nickname: string): Promise<void> {
    const account = this.create({
      user,
      nickname,
    });

    await this.save(account);
  }
}
