import { ApiProperty } from '@nestjs/swagger';
import { Length } from 'class-validator';

export class CreateConversationDto {
  @ApiProperty({ example: 'Conversation' })
  @Length(2, 16)
  title: string;
}
