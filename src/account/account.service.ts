import { Injectable } from '@nestjs/common';
import { AccountRepository } from './repository/account.repository';
import { User } from 'src/user/entities/user.entity';
import { Account } from './entities/account.entity';

@Injectable()
export class AccountService {
  constructor(private accountRepository: AccountRepository) {}

  createAccount(user: User, nickname: string): Promise<void> {
    return this.accountRepository.createAccount(user, nickname);
  }

  getAccount(user: User): Promise<Account> {
    return this.accountRepository.findAccount(user);
  }

  getAccountById(id: string): Promise<Account> {
    return this.accountRepository.findAccountById(id);
  }
}
