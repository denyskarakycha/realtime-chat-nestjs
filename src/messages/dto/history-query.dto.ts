import { IsDateString, IsEnum, IsOptional, Matches } from 'class-validator';
import { Chat } from '../enums/chat.enum';

export class HistoryQueryDto {
  @IsEnum(Chat)
  chatType: Chat;

  @IsDateString()
  @Matches(/^\d{4}-\d{2}-\d{2}$/)
  @IsOptional()
  date?: string;
}
