import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class TokenDto {
  @ApiProperty({
    type: String,
    required: true,
    description: 'User`s access token',
  })
  @IsNotEmpty()
  private readonly token: string;

  constructor(token: string) {
    this.token = token;
  }
}
