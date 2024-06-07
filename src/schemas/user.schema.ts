import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @ApiProperty({
    type: String,
    required: true,
    description: 'Username in wordle system',
  })
  @Prop({ required: true, unique: true })
  username: string;

  @ApiProperty({
    type: String,
    required: true,
    description: 'User`s password',
  })
  @Prop({ required: true })
  password: string;

  @ApiProperty({
    type: Number,
    required: true,
    description: 'Usern`s global score',
  })
  @Prop({
    default: 0,
  })
  score: number;

  @ApiProperty({
    type: String,
    required: true,
    description: 'User`s access token',
  })
  @Prop({
    default: false,
  })
  isAdmin: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
