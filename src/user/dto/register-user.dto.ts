import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length } from 'class-validator';

export class RegisterUserDto {
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
  @IsNotEmpty()
  @Length(8)
  readonly password: string;

  constructor(username: string, password: string) {
    this.username = username;
    this.password = password;
  }
}
