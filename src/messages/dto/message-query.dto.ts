import { IsDateString, IsEnum, Matches } from 'class-validator';
import { Chat } from '../enums/chat.enum';
import { ApiProperty } from '@nestjs/swagger';

export class MessageQueryDto {
  @ApiProperty({ example: 'CONVERSATION' })
  @IsEnum(Chat)
  chatType: Chat;

  @ApiProperty({ example: new Date().toISOString().split('T')[0] })
  @IsDateString()
  @Matches(/^\d{4}-\d{2}-\d{2}$/)
  date: string;
}
