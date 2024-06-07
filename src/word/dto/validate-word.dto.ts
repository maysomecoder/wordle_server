import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length } from 'class-validator';

export class ValidateWordDto {
  @ApiProperty({
    type: String,
    required: true,
    description: 'Word for validation',
  })
  @Length(5)
  readonly word: string;
}
