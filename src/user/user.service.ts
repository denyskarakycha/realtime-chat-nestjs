import { Injectable } from '@nestjs/common';
import { UserRepository } from './repository/user.repository';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  createUser(email: string, password: string): Promise<void> {
    return this.userRepository.createUser(email, password);
  }
}
