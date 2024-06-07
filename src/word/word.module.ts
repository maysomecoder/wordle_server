import { Module } from '@nestjs/common';
import { WordController } from './word.controller';
import { WordService } from './word.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Word, WordSchema } from 'src/schemas/word.schema';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.development.env' }),
    JwtModule.register({ global: true, secret: process.env.JWT_SECRET }),
    MongooseModule.forFeature([{ name: Word.name, schema: WordSchema }]),
  ],
  controllers: [WordController],
  providers: [WordService],
})
export class WordModule {}
