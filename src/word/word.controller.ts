import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { WordService } from './word.service';
import { Word } from 'src/schemas/word.schema';
import { CreateWordDto } from './dto/create-word.dto';
import { UpdateWordDto } from './dto/update-word.dto';
import { AuthAdminToken } from 'src/guards/auth-admin-token.guard';
import {
  ApiBearerAuth,
  ApiBody,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ValidateWordDto } from './dto/validate-word.dto';

@ApiTags('word')
@Controller('word')
export class WordController {
  constructor(private readonly wordService: WordService) {}

  @Get('/random')
  getRandomWord(): Promise<Word> {
    return this.wordService.getRandomWord();
  }

  @Post('/validate')
  validate(@Body() validateWordDto: ValidateWordDto) {
    return this.wordService.validate(validateWordDto);
  }

  @UseGuards(AuthAdminToken)
  @ApiBearerAuth('admin token')
  @ApiResponse({ type: [Word] })
  @Get()
  getAllWords(): Promise<Word[]> {
    return this.wordService.getAllWords();
  }

  @UseGuards(AuthAdminToken)
  @ApiBearerAuth('admin token')
  @ApiBody({ type: CreateWordDto })
  @ApiResponse({ type: Word })
  @Post()
  create(@Body() createWordDto: CreateWordDto): Promise<Word> {
    return this.wordService.create(createWordDto);
  }

  @UseGuards(AuthAdminToken)
  @ApiBearerAuth('admin token')
  @ApiParam({ name: 'id', type: String, description: 'Word id for delete' })
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.wordService.delete(id);
  }

  @UseGuards(AuthAdminToken)
  @ApiBearerAuth('admin token')
  @ApiBody({ type: UpdateWordDto })
  @ApiParam({ name: 'id', type: String, description: 'Word id for delete' })
  @Patch(':id')
  udpate(@Param('id') id: string, @Body() updateWordDto: UpdateWordDto) {
    return this.wordService.update(id, updateWordDto);
  }
}
