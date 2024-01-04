import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument } from 'mongoose';

export type MessageContentDocument = HydratedDocument<MessageContent>;

@Schema()
export class MessageContent {
  @ApiProperty({ example: 'uuid' })
  @Prop()
  accountId: string;

  @ApiProperty({ example: 'Test' })
  @Prop()
  nickname: string;

  @ApiProperty({ example: 'Some Text' })
  @Prop()
  text: string;
}

export const MessageContentSchema =
  SchemaFactory.createForClass(MessageContent);
