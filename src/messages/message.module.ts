import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ChatMessagesHistory,
  ChatMessagesHistorySchema,
} from './schemas/chat-messages-history.shema';
import { AuthModule } from 'src/auth/auth.module';
import { AccountModule } from 'src/account/account.module';
import { Dialog, DialogSchema } from './schemas/dialog.schema';
import { DateService } from './utils/date.service';
import { ChatModule } from 'src/chat/chat.module';

@Module({
  imports: [
    AuthModule,
    AccountModule,
    ChatModule,
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
