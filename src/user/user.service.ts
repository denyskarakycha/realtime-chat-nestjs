import { Injectable } from '@nestjs/common';
import { UserRepository } from './repository/user.repository';
import { User } from './entities/user.entity';
import { AccountService } from 'src/account/account.service';

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
    private accountService: AccountService,
  ) {}

  async createUser(email: string, hashedPassword: string): Promise<void> {
    const user = await this.userRepository.createUser(email, hashedPassword);

    return this.accountService.createAccount(user);
  }

  findUser(email: string): Promise<User> {
    return this.userRepository.findUser(email);
  }
}
