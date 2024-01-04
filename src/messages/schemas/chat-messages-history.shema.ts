import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument, Types } from 'mongoose';
import { Dialog } from './dialog.schema';

export type ChatMessagesHistoryDocument = HydratedDocument<ChatMessagesHistory>;

@Schema()
export class ChatMessagesHistory {
  @ApiProperty({ example: 'uuid' })
  @Prop()
  chatId: string;

  @ApiProperty({
    type: () => [Dialog],
    description:
      'Array of dialog objects with ObjectId references to the Dialog model.',
  })
  @Prop({ type: [{ dialog: { type: Types.ObjectId, ref: 'Dialog' } }] })
  history: { dialog: Types.ObjectId }[];
}

export const ChatMessagesHistorySchema =
  SchemaFactory.createForClass(ChatMessagesHistory);
