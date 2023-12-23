import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Patch,
  Query,
} from '@nestjs/common';
import { ChatService } from './chat.service';
import { ConversationDto } from './dto/conversation.dto';
import { Conversation } from 'src/conversation/entities/conversation.entity';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { GetUser } from 'src/user/decorators/get-user.decorator';
import { User } from 'src/user/entities/user.entity';
import { Account } from 'src/account/entities/account.entity';
import { GetConversationFilterDto } from './dto/get-conversations-filter.dto';

@Controller('chat')
@UseGuards(JwtGuard)
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get('/convesations')
  getConversations(
    @Query() getConversationFilterDto: GetConversationFilterDto,
  ): Promise<Conversation[]> {
    return this.chatService.getConversations(getConversationFilterDto);
  }

  @Post('/convesation')
  createConvesation(
    @Body() conversationDto: ConversationDto,
    @GetUser() user: User,
  ): Promise<Conversation> {
    return this.chatService.createConvesation(conversationDto, user);
  }

  @Get('/convesation/:id/participans')
  getConversationParticipans(@Param('id') id: string): Promise<Account[]> {
    return this.chatService.getConversationParticipans(id);
  }

  @Patch('/convesation/:id')
  addAccountToConversation(
    @GetUser() user: User,
    @Param('id') id: string,
  ): Promise<Conversation> {
    return this.chatService.addAccountToConversation(id, user);
  }
}
