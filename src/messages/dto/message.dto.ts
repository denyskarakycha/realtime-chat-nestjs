import { Length } from 'class-validator';

export class MessageDto {
  @Length(1, 50)
  text: string;
}
