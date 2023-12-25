import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type ChatMessagesHistoryDocument = HydratedDocument<ChatMessagesHistory>;

@Schema()
export class ChatMessagesHistory {
  @Prop()
  chatId: string;

  @Prop([
    {
      dialogDate: { type: String, required: true },
      dialogId: { type: Types.ObjectId, ref: 'Dialog' },
    },
  ])
  history: { dialogDate: string; dialogId: Types.ObjectId }[];
}

export const ChatMessagesHistorySchema =
  SchemaFactory.createForClass(ChatMessagesHistory);
