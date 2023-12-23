import { IsOptional } from 'class-validator';

export class GetConversationFilterDto {
  @IsOptional()
  title?: string;
}
