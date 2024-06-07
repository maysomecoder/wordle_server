import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty } from 'class-validator';

export class TokenPayloadDto {
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
    type: Boolean,
    required: true,
    description: 'User`s admin status',
  })
  @IsNotEmpty()
  @IsBoolean()
  readonly isAdmin: boolean;

  constructor(id: string, username: string, isAdmin: boolean) {
    this.id = id;
    this.username = username;
    this.isAdmin = isAdmin;
  }
}
