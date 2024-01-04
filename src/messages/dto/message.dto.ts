import { ApiProperty } from '@nestjs/swagger';
import { Length } from 'class-validator';

export class MessageDto {
  @ApiProperty({ example: 'Some text' })
  @Length(1, 50)
  text: string;
}
