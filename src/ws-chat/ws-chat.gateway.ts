import { ConflictException, UnauthorizedException } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { AuthService } from 'src/auth/auth.service';
import { MessageGatewayDto } from './dto/message-gateway.dto';
import { MessageService } from 'src/messages/message.service';
import { MessageDto } from 'src/messages/dto/message.dto';
import { MessageQueryDto } from 'src/messages/dto/message-query.dto';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';
import { JoinChatDto } from './dto/join-chat.dto';
import { AccountService } from 'src/account/account.service';
import { ChatService } from 'src/chat/chat.service';
import { HistoryQueryDto } from 'src/messages/dto/history-query.dto';

@WebSocketGateway()
export class WsChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(
    private authService: AuthService,
    private messageService: MessageService,
    private userService: UserService,
    private accountService: AccountService,
    private chatService: ChatService,
  ) {}

  async handleConnection(client: Socket) {
    const authorizationHeader: string | null =
      client.handshake.headers.authorization;

    const jwtPayload =
      await this.authService.getJwtPayload(authorizationHeader);

    if (!jwtPayload) {
      return this.handleDisconnect(client);
    }

    const user = await this.userService.getUser(jwtPayload.email);
    client.data.user = user;
  }

  handleDisconnect(client: Socket) {
    client.emit(
      'UnauthorizedException',
      new UnauthorizedException('Check your login credentials'),
    );
    client.disconnect();
  }

  updateToken(clientId: string, accessToken: string) {
    this.server.to(clientId).emit('AccessTokenUpdate', accessToken);
  }

  @SubscribeMessage('joinChat')
  async onJoinChat(client: Socket, joinChatDto: JoinChatDto) {
    const { chatId, chatType } = joinChatDto;
    const historyQueryDto: HistoryQueryDto = { chatType };
    const user = client.data.user as User;
    try {
      const account = await this.accountService.getAccount(user);
      const chat = await this.chatService.getChat(account, chatId, chatType);

      client.join(chat.id);

      return await this.messageService.getChatMessagesHistory(
        chatId,
        user,
        historyQueryDto,
      );
    } catch (err) {
      client.emit(
        'JoinException',
        new ConflictException('You are not logged in to this chat'),
      );
    }
  }

  @SubscribeMessage('sendMessage')
  async handleMessage(client: Socket, messageGatewayDto: MessageGatewayDto) {
    const { text, chatId, chatType, date } = messageGatewayDto;
    const messageDto: MessageDto = { text };
    const messageQueryDto: MessageQueryDto = { chatType, date };
    const user = client.data.user as User;

    const isUserInRoom = this.isUserInRoom(client, chatId);

    if (!isUserInRoom) {
      client.emit(
        'JoinException',
        new ConflictException('You are not logged in to this chat'),
      );
      return;
    }

    try {
      const account = await this.accountService.getAccount(user);
      const chat = await this.chatService.getChat(account, chatId, chatType);

      const message = await this.messageService.sendMessageToChat(
        chat.id,
        messageDto,
        user,
        messageQueryDto,
      );

      this.server.to(chatId).emit('NewMessage', message);
    } catch (err) {
      client.emit('Error', new ConflictException());
    }
  }

  private isUserInRoom(client: Socket, chatId: string) {
    const room = client.rooms;
    if (room.has(chatId)) {
      return true;
    }

    return false;
  }
}
