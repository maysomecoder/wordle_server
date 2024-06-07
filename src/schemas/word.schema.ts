import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument } from 'mongoose';

export type WordDocument = HydratedDocument<Word>;

@Schema()
export class Word {
  @ApiProperty({
    type: String,
    required: true,
    description: 'Returned word for game',
  })
  @Prop({ required: true })
  word: string;
}

export const WordSchema = SchemaFactory.createForClass(Word);
