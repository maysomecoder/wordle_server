import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { WordController } from './word/word.controller';
import { WordService } from './word/word.service';
import { WordModule } from './word/word.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.production.env' }),
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@wordle.wolqn9u.mongodb.net/?retryWrites=true&w=majority&appName=wordle`,
    ),
    UserModule,
    AuthModule,
    WordModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
