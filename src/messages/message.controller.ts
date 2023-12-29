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

@Controller('messages')
@UseGuards(JwtGuard)
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

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

  @Get('/history/chat/:id')
  getChatMessagesHistory(
    @GetUser() user: User,
    @Param('id') id: string,
    @Query() historyQueryDto: HistoryQueryDto,
  ) {
    return this.messageService.getChatMessagesHistory(
      id,
      user,
      historyQueryDto,
    );
  }
}
