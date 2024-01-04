import { DataSource, Repository } from 'typeorm';
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
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

  async findAccountByNickname(nickname: string): Promise<Account> {
    const account = await this.findOneBy({ nickname });
    return account;
  }

  async createAccount(user: User, nickname: string): Promise<void> {
    try {
      const account = this.create({
        user,
        nickname,
      });
      await this.save(account);
    } catch (err) {
      if (err.code === '23505') {
        throw new ConflictException('Nickname already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
