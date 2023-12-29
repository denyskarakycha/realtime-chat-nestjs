import { IsDateString, IsEnum, Matches } from 'class-validator';
import { Chat } from '../enums/chat.enum';

export class MessageQueryDto {
  @IsEnum(Chat)
  chatType: Chat;

  @IsDateString()
  @Matches(/^\d{4}-\d{2}-\d{2}$/)
  date: string;
}
