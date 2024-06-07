import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';

export class ReturnUserDto {
  @ApiProperty({
    type: String,
    required: true,
    description: 'User`s id',
  })
  @IsNotEmpty()
  private readonly id: string;

  @ApiProperty({
    type: String,
    required: true,
    description: 'Username in wordle system',
  })
  @IsNotEmpty()
  private readonly username: string;

  @ApiProperty({
    type: Number,
    required: true,
    description: 'Usern`s global score',
  })
  @IsNotEmpty()
  @IsNumber()
  private readonly score: number;

  @ApiProperty({
    type: Boolean,
    required: true,
    description: 'Usern`s admin status',
  })
  @IsNotEmpty()
  @IsBoolean()
  private readonly isAdmin: boolean;

  constructor(id: string, username: string, score: number, isAdmin: boolean) {
    this.id = id;
    this.username = username;
    this.score = score;
    this.isAdmin = isAdmin;
  }
}
