import { Length } from 'class-validator';

export class ConversationDto {
  @Length(2, 10)
  title: string;
}
