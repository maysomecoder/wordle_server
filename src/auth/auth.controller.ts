import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserAuthDto } from './dto/user-auth.dto';
import { TokenDto } from '../global-dto/token.dto';
import { ReturnUserDto } from 'src/global-dto/return-user.dto';
import { AuthToken } from 'src/guards/auth-token.guard';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBody({ type: UserAuthDto })
  @ApiResponse({ type: TokenDto })
  @Post()
  authLogin(@Body() userAuthDto: UserAuthDto): Promise<TokenDto> {
    return this.authService.authLogin(userAuthDto);
  }

  @UseGuards(AuthToken)
  @ApiBearerAuth('token')
  @ApiResponse({ type: ReturnUserDto })
  @Get()
  authToken(@Req() request: Request): Promise<ReturnUserDto> {
    return this.authService.authToken(request['user']['id']);
  }
}
