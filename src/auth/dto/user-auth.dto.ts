import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length } from 'class-validator';

export class UserAuthDto {
  @ApiProperty({
    type: String,
    required: true,
    description: 'Username in wordle system',
  })
  @IsNotEmpty()
  readonly username: string;

  @ApiProperty({
    type: String,
    required: true,
    description: 'User`s password',
  })
  
  @Length(8)
  readonly password: string;
}
