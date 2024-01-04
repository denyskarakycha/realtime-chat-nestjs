import { ConflictException, Injectable } from '@nestjs/common';
import { UserRepository } from './repository/user.repository';
import { User } from './entities/user.entity';
import { AccountService } from 'src/account/account.service';

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
    private accountService: AccountService,
  ) {}

  async createUser(
    email: string,
    hashedPassword: string,
    nickname: string,
  ): Promise<void> {
    const isExistAccount =
      await this.accountService.getAccountByNickname(nickname);
    if (isExistAccount) {
      throw new ConflictException('Account nickname is exist');
    }
    const user = await this.userRepository.createUser(email, hashedPassword);

    return this.accountService.createAccount(user, nickname);
  }

  getUser(email: string): Promise<User> {
    return this.userRepository.findUser(email);
  }
}
