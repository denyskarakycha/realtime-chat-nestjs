import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { MessageModule } from 'src/messages/message.module';
import { WsChatGateway } from './ws-chat.gateway';
import { UserModule } from 'src/user/user.module';
import { AccountModule } from 'src/account/account.module';
import { ChatModule } from 'src/chat/chat.module';

@Module({
  imports: [
    AuthModule,
    MessageModule,
    MessageModule,
    UserModule,
    AccountModule,
    ChatModule,
  ],
  providers: [WsChatGateway],
  exports: [WsChatGateway],
})
export class WsChatModule {}
