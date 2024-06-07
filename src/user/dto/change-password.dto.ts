import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length } from 'class-validator';

export class ChangePasswordDto {
  @ApiProperty({
    type: String,
    required: true,
    description: 'User`s current password',
  })
  @IsNotEmpty()
  @Length(8)
  readonly oldPassword: string;

  @ApiProperty({
    type: String,
    required: true,
    description: 'User`s new password',
  })
  @IsNotEmpty()
  @Length(8)
  readonly newPassword: string;
}
