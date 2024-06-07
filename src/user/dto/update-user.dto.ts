import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class UpdateUserDto {
  @ApiProperty({
    type: String,
    required: true,
    description: 'Username in wordle system',
  })
  @IsNotEmpty()
  private readonly username: string;
}
