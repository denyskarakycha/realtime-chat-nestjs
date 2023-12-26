import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from './entities/account.entity';
import { AccountRepository } from './repository/account.repository';
import { Conversation } from 'src/conversation/entities/conversation.entity';
import { Direct } from 'src/direct/entities/direct.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Account, Conversation, Direct])],
  providers: [AccountService, AccountRepository],
  exports: [AccountService, AccountRepository],
})
export class AccountModule {}
