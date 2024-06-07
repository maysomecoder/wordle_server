import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { UpdateUserDto as UpdateUserDto } from './dto/update-user.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { TokenDto } from 'src/global-dto/token.dto';
import { LeaderboardUserDto } from './dto/leaderboard-user.dto';
import { AuthToken } from 'src/guards/auth-token.guard';
import {
  ApiBearerAuth,
  ApiBody,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('user')
@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiResponse({ type: [LeaderboardUserDto] })
  @Get()
  getLeaderboard(): Promise<LeaderboardUserDto[]> {
    return this.userService.getLeaderboard();
  }

  @ApiBody({ type: RegisterUserDto })
  @ApiResponse({ type: [TokenDto] })
  @Post()
  register(@Body() registerUserDto: RegisterUserDto): Promise<TokenDto> {
    return this.userService.register(registerUserDto);
  }

  @UseGuards(AuthToken)
  @ApiBearerAuth('token')
  @ApiBody({ type: ChangePasswordDto })
  @Patch('/password')
  changePassword(
    @Req() request: Request,
    @Body() changePasswordDto: ChangePasswordDto,
  ) {
    return this.userService.changePassword(
      request['user']['id'],
      changePasswordDto,
    );
  }

  @UseGuards(AuthToken)
  @ApiBearerAuth('token')
  @ApiBody({ type: UpdateUserDto })
  @Patch()
  upadte(@Req() request: Request, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(request['user']['id'], updateUserDto);
  }

  @UseGuards(AuthToken)
  @ApiBearerAuth('token')
  @Delete()
  delete(@Req() request: Request) {
    return this.userService.delete(request['user']['id']);
  }

  @UseGuards(AuthToken)
  @ApiBearerAuth('token')
  @ApiQuery({ type: Number, name: 'result' })
  @Get('/result')
  resultProcessing(@Req() request: Request, @Query('result') result) {
    return this.userService.resultProcessing(request['user']['id'], result);
  }
}
