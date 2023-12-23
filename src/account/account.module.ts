import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from './entities/account.entity';
import { AccountRepository } from './repository/account.repository';
import { Conversation } from 'src/conversation/entities/conversation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Account, Conversation])],
  providers: [AccountService, AccountRepository],
  exports: [AccountService, AccountRepository],
})
export class AccountModule {}
