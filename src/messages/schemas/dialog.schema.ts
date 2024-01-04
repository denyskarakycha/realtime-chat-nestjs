import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { MessageContent } from './message-content.shema';
import { ApiProperty } from '@nestjs/swagger';

export type DialogDocument = HydratedDocument<Dialog>;

@Schema()
export class Dialog {
  @ApiProperty({ example: '2024-01-01' })
  @Prop()
  dialogDate: string;

  @ApiProperty({ example: 'uuid' })
  @Prop()
  chatId: string;

  @ApiProperty({ type: () => [MessageContent] })
  @Prop()
  content: MessageContent[];
}

export const DialogSchema = SchemaFactory.createForClass(Dialog);
