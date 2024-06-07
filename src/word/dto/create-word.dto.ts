import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length } from 'class-validator';

export class CreateWordDto {
  @ApiProperty({
    type: String,
    required: true,
    description: 'Returned word for game',
  })
  @Length(5)
  private readonly word: string;
}
