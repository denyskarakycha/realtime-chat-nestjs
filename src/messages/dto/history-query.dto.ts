import { IsEnum } from 'class-validator';
import { Chat } from '../enums/chat.enum';
import { ApiProperty } from '@nestjs/swagger';

export class HistoryQueryDto {
  @ApiProperty({ example: 'CONVERSATION' })
  @IsEnum(Chat)
  chatType: Chat;
}
