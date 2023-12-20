import { DataSource, Repository } from 'typeorm';
import { User } from '../entitys/user.entity';
import { ConflictException, Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async findUser(email: string): Promise<User> {
    const user = await this.findOneBy({
      email,
    });

    return user;
  }

  async createUser(email: string, hashedPassword: string): Promise<void> {
    const isExistUser = await this.findUser(email);

    if (isExistUser) {
      throw new ConflictException('User already exists');
    }

    const user = this.create({
      email,
      password: hashedPassword,
    });

    await this.save(user);
  }
}
