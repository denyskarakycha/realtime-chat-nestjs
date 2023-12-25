import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { MessageContent } from './message-content.shema';

export type DialogDocument = HydratedDocument<Dialog>;

@Schema()
export class Dialog {
  @Prop()
  dialogDate: string;

  @Prop()
  content: MessageContent[];
}

export const DialogSchema = SchemaFactory.createForClass(Dialog);
