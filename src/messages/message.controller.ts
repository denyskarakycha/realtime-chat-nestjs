import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageDto } from './dto/message.dto';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { GetUser } from 'src/user/decorators/get-user.decorator';
import { User } from 'src/user/entities/user.entity';
import { ChatMessagesHistory } from './schemas/chat-messages-history.shema';
import { Dialog } from './schemas/dialog.schema';
import { MessageQueryDto } from './dto/message-query.dto';
import { HistoryQueryDto } from './dto/history-query.dto';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { DialogQueryDto } from './dto/dialogs-query.dto';

@ApiTags('Message')
@Controller('messages')
@UseGuards(JwtGuard)
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @ApiParam({ name: 'id', example: 'uuid', description: 'Chat ID' })
  @ApiCreatedResponse({ type: ChatMessagesHistory })
  @ApiOkResponse({ type: Dialog })
  @Post('/to/chat/:id')
  sendMessageToChat(
    @GetUser() user: User,
    @Param('id') id: string,
    @Query() messageQueryDto: MessageQueryDto,
    @Body() messageDto: MessageDto,
  ): Promise<ChatMessagesHistory | Dialog> {
    return this.messageService.sendMessageToChat(
      id,
      messageDto,
      user,
      messageQueryDto,
    );
  }

  @ApiParam({ name: 'id', example: 'uuid', description: 'Chat ID' })
  @ApiOkResponse({ type: ChatMessagesHistory })
  @Get('/history/chat/:id')
  getChatMessagesHistory(
    @GetUser() user: User,
    @Param('id') id: string,
    @Query() historyQueryDto: HistoryQueryDto,
  ): Promise<ChatMessagesHistory> {
    return this.messageService.getChatMessagesHistory(
      id,
      user,
      historyQueryDto,
    );
  }

  @ApiParam({ name: 'id', example: 'uuid', description: 'Chat ID' })
  @ApiResponse({ type: [Dialog] })
  @Get('/dialogs/chat/:id')
  getDialogs(
    @GetUser() user: User,
    @Param('id') id: string,
    @Query() dialogQueryDto: DialogQueryDto,
  ): Promise<Dialog[]> {
    return this.messageService.getDialogs(id, user, dialogQueryDto);
  }
}
