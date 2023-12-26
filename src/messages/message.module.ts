import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { ConversationModule } from 'src/conversation/conversation.module';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ChatMessagesHistory,
  ChatMessagesHistorySchema,
} from './schemas/chat-messages-history.shema';
import { AuthModule } from 'src/auth/auth.module';
import { AccountModule } from 'src/account/account.module';
import { Dialog, DialogSchema } from './schemas/dialog.schema';
import { DateService } from './utils/date.service';

@Module({
  imports: [
    AuthModule,
    ConversationModule,
    AccountModule,
    MongooseModule.forFeature([
      { name: ChatMessagesHistory.name, schema: ChatMessagesHistorySchema },
      { name: Dialog.name, schema: DialogSchema },
    ]),
  ],
  controllers: [MessageController],
  providers: [MessageService, DateService],
  exports: [MessageService],
})
export class MessageModule {}
