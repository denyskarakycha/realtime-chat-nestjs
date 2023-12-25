import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type MessageContentDocument = HydratedDocument<MessageContent>;

@Schema()
export class MessageContent {
  @Prop()
  accountId: string;

  @Prop()
  nickname: string;

  @Prop()
  text: string;

  @Prop()
  time: string;
}

export const MessageContentSchema =
  SchemaFactory.createForClass(MessageContent);
