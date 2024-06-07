import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class LeaderboardUserDto {
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
  private readonly score: number;

  constructor(username: string, score: number) {
    this.username = username;
    this.score = score;
  }
}
