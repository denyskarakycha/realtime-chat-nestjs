import { Module } from '@nestjs/common';
import { ConversationService } from './conversation.service';
import { ConversationRepository } from './repository/conversation.repository';

@Module({
  providers: [ConversationService, ConversationRepository],
  exports: [ConversationService, ConversationRepository],
})
export class ConversationModule {}
