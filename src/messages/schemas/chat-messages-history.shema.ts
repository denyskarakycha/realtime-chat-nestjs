import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type ChatMessagesHistoryDocument = HydratedDocument<ChatMessagesHistory>;

@Schema()
export class ChatMessagesHistory {
  @Prop()
  chatId: string;

  @Prop({ type: [{ dialog: { type: Types.ObjectId, ref: 'Dialog' } }] })
  history: { dialog: Types.ObjectId }[];
}

export const ChatMessagesHistorySchema =
  SchemaFactory.createForClass(ChatMessagesHistory);
