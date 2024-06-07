import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Word } from 'src/schemas/word.schema';
import { CreateWordDto } from './dto/create-word.dto';
import { UpdateWordDto } from './dto/update-word.dto';
import { ValidateWordDto } from './dto/validate-word.dto';
import { STATUS_CODES } from 'http';
import { WordleMainError } from 'src/custom-errors/errors/wordle-main.error';

@Injectable()
export class WordService {
  constructor(
    @InjectModel(Word.name) private readonly wordModel: Model<Word>,
  ) {}

  async getRandomWord(): Promise<Word> {
    const words = await this.wordModel.find();

    const id = Math.floor(Math.random() * words.length);

    return words[id];
  }

  async validate(validateWordDto: ValidateWordDto) {
    const word = await this.wordModel.findOne({ ...validateWordDto });

    if (word !== null) {
      return word;
    } else {
      throw new WordleMainError(HttpStatus.NOT_FOUND, [
        `Word ${validateWordDto.word} is not found`,
      ]);
    }
  }

  getAllWords(): Promise<Word[]> {
    return this.wordModel.find();
  }

  create(createWordDto: CreateWordDto): Promise<Word> {
    return this.wordModel.create({ ...createWordDto });
  }

  async delete(id: string) {
    const word = await this.wordModel.findById(id);

    if (word != null) {
      return word.deleteOne();
    } else {
      throw new WordleMainError(HttpStatus.NOT_FOUND, [`Word is not found`]);
    }
  }

  async update(id: string, updateWordDto: UpdateWordDto) {
    const word = await this.wordModel.findById(id);

    if (word != null) {
      return this.wordModel.updateOne({ _id: id }, { ...updateWordDto });
    } else {
      throw new WordleMainError(HttpStatus.NOT_FOUND, [`Word is not found`]);
    }
  }
}
