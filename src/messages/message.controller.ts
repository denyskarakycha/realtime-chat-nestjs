import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageDto } from './dto/message.dto';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { GetUser } from 'src/user/decorators/get-user.decorator';
import { User } from 'src/user/entities/user.entity';
import { ChatMessagesHistory } from './schemas/chat-messages-history.shema';
import { Dialog } from './schemas/dialog.schema';

@Controller('message')
@UseGuards(JwtGuard)
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post('/conversation/:id')
  sendToConversation(
    @GetUser() user: User,
    @Param('id') id: string,
    @Body() messageDto: MessageDto,
  ): Promise<ChatMessagesHistory | Dialog> {
    return this.messageService.sendMessageToConversation(id, messageDto, user);
  }
}
