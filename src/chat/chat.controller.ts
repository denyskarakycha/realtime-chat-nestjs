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
import { CreateConversationDto } from './dto/create-conversation.dto';
import { Conversation } from 'src/conversation/entities/conversation.entity';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { GetUser } from 'src/user/decorators/get-user.decorator';
import { User } from 'src/user/entities/user.entity';
import { Account } from 'src/account/entities/account.entity';
import { GetConversationFilterDto } from './dto/get-conversations-filter.dto';
import { Direct } from 'src/direct/entities/direct.entity';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Chat')
@Controller('chat')
@UseGuards(JwtGuard)
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @ApiQuery({
    name: 'title',
    example: 'Conversation',
    required: false,
  })
  @ApiOkResponse({ type: [Conversation] })
  @Get('/convesations')
  getConversations(
    @Query() getConversationFilterDto: GetConversationFilterDto,
  ): Promise<Conversation[]> {
    return this.chatService.getConversations(getConversationFilterDto);
  }

  @ApiParam({ name: 'id', example: 'uuid', description: 'Conversation ID' })
  @ApiOkResponse({ type: Conversation })
  @Get('/convesation/:id')
  getConversation(
    @GetUser() user: User,
    @Param('id') id: string,
  ): Promise<Conversation> {
    return this.chatService.getConversation(user, id);
  }

  @ApiCreatedResponse({ type: Conversation })
  @Post('/convesation')
  createConvesation(
    @Body() createConversationDto: CreateConversationDto,
    @GetUser() user: User,
  ): Promise<Conversation> {
    return this.chatService.createConvesation(createConversationDto, user);
  }

  @ApiParam({ name: 'id', example: 'uuid', description: 'Conversation ID' })
  @ApiOkResponse({ type: [Account] })
  @Get('/convesation/:id/participans')
  getConversationParticipans(
    @GetUser() user: User,
    @Param('id') id: string,
  ): Promise<Account[]> {
    return this.chatService.getConversationParticipans(user, id);
  }

  @ApiParam({ name: 'id', example: 'uuid', description: 'Conversation ID' })
  @ApiOkResponse({ type: Conversation })
  @Patch('join/account/to/convesation/:id')
  addAccountToConversation(
    @GetUser() user: User,
    @Param('id') id: string,
  ): Promise<Conversation> {
    return this.chatService.addAccountToConversation(id, user);
  }

  @ApiOkResponse({ type: [Direct] })
  @Get('/directs')
  getDirects(@GetUser() user: User): Promise<Direct[]> {
    return this.chatService.getDirects(user);
  }

  @ApiParam({
    name: 'recipientId',
    example: 'uuid',
    description: 'RecipientId ID',
  })
  @ApiCreatedResponse({ type: [Direct] })
  @Post('/direct/:recipientId')
  createDirect(
    @GetUser() user: User,
    @Param('recipientId') recipientId: string,
  ): Promise<Direct> {
    return this.chatService.createDirect(user, recipientId);
  }
}
