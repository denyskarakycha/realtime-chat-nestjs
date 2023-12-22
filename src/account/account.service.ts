import { Injectable } from '@nestjs/common';
import { AccountRepository } from './repository/account.repository';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class AccountService {
  constructor(private accountRepository: AccountRepository) {}

  createAccount(user: User): Promise<void> {
    return this.accountRepository.createAccount(user);
  }
}
