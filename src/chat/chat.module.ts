import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { ConversationModule } from 'src/conversation/conversation.module';
import { AuthModule } from 'src/auth/auth.module';
import { AccountModule } from 'src/account/account.module';
import { DirectModule } from 'src/direct/direct.module';

@Module({
  imports: [ConversationModule, AuthModule, AccountModule, DirectModule],
  controllers: [ChatController],
  providers: [ChatService],
  exports: [ChatService],
})
export class ChatModule {}
