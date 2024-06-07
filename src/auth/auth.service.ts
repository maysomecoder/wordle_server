import { HttpStatus, Injectable } from '@nestjs/common';
import { UserAuthDto } from './dto/user-auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/schemas/user.schema';
import { Model } from 'mongoose';

import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { TokenDto } from '../global-dto/token.dto';
import { TokenPayloadDto } from '../global-dto/token-payload.dto';
import { ReturnUserDto } from 'src/global-dto/return-user.dto';
import { WordleMainError } from 'src/custom-errors/errors/wordle-main.error';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly jwtService: JwtService,
  ) {}

  async authLogin(userAuthDto: UserAuthDto): Promise<TokenDto> {
    const user = await this.userModel.findOne({
      username: userAuthDto.username,
    });

    if (user != null) {
      const isMatch = await bcrypt.compare(userAuthDto.password, user.password);

      if (isMatch) {
        const payload = new TokenPayloadDto(
          user.id,
          user.username,
          user.isAdmin,
        );

        const token = await this.jwtService.signAsync({ ...payload });

        return new TokenDto(token);
      } else {
      }
    } else {
      throw new WordleMainError(HttpStatus.NOT_FOUND, ['User not found']);
    }
  }

  async authToken(id: string): Promise<ReturnUserDto> {
    const user = await this.userModel.findById(id);
    return new ReturnUserDto(user.id, user.username, user.score, user.isAdmin);
  }
}
