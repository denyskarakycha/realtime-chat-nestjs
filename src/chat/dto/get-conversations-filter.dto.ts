import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, Length } from 'class-validator';

export class GetConversationFilterDto {
  @ApiProperty({ example: 'Conversation' })
  @IsOptional()
  @Length(2, 16)
  title?: string;
}
