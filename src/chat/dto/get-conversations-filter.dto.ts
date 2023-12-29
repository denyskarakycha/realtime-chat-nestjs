import { IsOptional, Length } from 'class-validator';

export class GetConversationFilterDto {
  @IsOptional()
  @Length(2, 10)
  title?: string;
}
