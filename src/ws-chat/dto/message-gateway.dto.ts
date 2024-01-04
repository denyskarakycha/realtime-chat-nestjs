import { Chat } from 'src/messages/enums/chat.enum';

export class MessageGatewayDto {
  text: string;
  chatId: string;
  chatType: Chat;
  date: string;
}
