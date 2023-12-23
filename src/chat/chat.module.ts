import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { ConversationModule } from 'src/conversation/conversation.module';
import { AuthModule } from 'src/auth/auth.module';
import { AccountModule } from 'src/account/account.module';

@Module({
  imports: [ConversationModule, AuthModule, AccountModule],
  controllers: [ChatController],
  providers: [ChatService],
})
export class ChatModule {}
