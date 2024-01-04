import { IsDateString, IsEnum, Matches } from 'class-validator';
import { Chat } from '../enums/chat.enum';
import { ApiProperty } from '@nestjs/swagger';

export class DialogQueryDto {
  @ApiProperty({ example: 'CONVERSATION' })
  @IsEnum(Chat)
  chatType: Chat;

  @ApiProperty({ example: '2024-01-01', required: true })
  @IsDateString()
  @Matches(/^\d{4}-\d{2}-\d{2}$/)
  searchDate: string;
}
