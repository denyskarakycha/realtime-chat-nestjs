import { Chat } from 'src/messages/enums/chat.enum';

export class JoinChatDto {
  chatId: string;

  chatType: Chat;
}
