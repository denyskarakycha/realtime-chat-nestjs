import { Injectable } from '@nestjs/common';
import { UserRepository } from './repository/user.repository';
import { User } from './entitys/user.entity';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  createUser(email: string, hashedPassword: string): Promise<void> {
    return this.userRepository.createUser(email, hashedPassword);
  }

  findUser(email: string): Promise<User> {
    return this.userRepository.findUser(email);
  }
}
