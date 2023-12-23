import { Injectable } from '@nestjs/common';
import { AccountRepository } from './repository/account.repository';
import { User } from 'src/user/entities/user.entity';
import { Account } from './entities/account.entity';

@Injectable()
export class AccountService {
  constructor(private accountRepository: AccountRepository) {}

  createAccount(user: User): Promise<void> {
    return this.accountRepository.createAccount(user);
  }

  getAccount(user: User): Promise<Account> {
    return this.accountRepository.findAccount(user);
  }
}
