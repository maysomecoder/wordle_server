import { HttpStatus, Injectable } from '@nestjs/common';
import { User } from '../schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RegisterUserDto } from './dto/register-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import * as bcrypt from 'bcrypt';
import { ChangePasswordDto } from './dto/change-password.dto';
import { hashPassword } from 'src/helpers/hash_password';
import { TokenDto } from 'src/global-dto/token.dto';
import { TokenPayloadDto } from 'src/global-dto/token-payload.dto';
import { JwtService } from '@nestjs/jwt';
import { LeaderboardUserDto } from './dto/leaderboard-user.dto';
import { WordleMainError } from 'src/custom-errors/errors/wordle-main.error';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly jwtService: JwtService,
  ) {}

  async getLeaderboard(): Promise<LeaderboardUserDto[]> {
    const users = await this.userModel.find().sort({ points: -1 });

    const leaderboardUsers = [];

    users.forEach((user) =>
      leaderboardUsers.push(new LeaderboardUserDto(user.username, user.score)),
    );

    return leaderboardUsers;
  }

  async register(registerUserDro: RegisterUserDto): Promise<TokenDto> {
    const hash = await hashPassword(registerUserDro.password);

    const hashedUser = new RegisterUserDto(registerUserDro.username, hash);

    const user = await this.userModel.create({ ...hashedUser });

    const payload = new TokenPayloadDto(user.id, user.username, user.isAdmin);

    const token = await this.jwtService.signAsync({ ...payload });

    return new TokenDto(token);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userModel.findById(id);

    if (user != null) {
      return user.updateOne({ ...updateUserDto });
    } else {
      throw new WordleMainError(HttpStatus.NOT_FOUND, ['User not found']);
    }
  }

  async changePassword(id: string, changePasswordDto: ChangePasswordDto) {
    const user = await this.userModel.findById(id);

    const isMatch = await bcrypt.compare(
      changePasswordDto.oldPassword,
      user.password,
    );

    if (isMatch) {
      const hash = await hashPassword(changePasswordDto.newPassword);

      return this.userModel.updateOne({ _id: id }, { password: hash });
    } else {
      throw new WordleMainError(HttpStatus.BAD_REQUEST, ['Wrong password']);
    }
  }

  async delete(id: string) {
    const user = await this.userModel.findById(id);

    if (user != null) {
      return user.deleteOne();
    } else {
      throw new WordleMainError(HttpStatus.NOT_FOUND, ['User not found']);
    }
  }

  async resultProcessing(id: string, result: number) {
    const user = await this.userModel.findById(id);

    if (user != null) {
      return user.updateOne({ $inc: { score: (6 - result) * 100 } });
    } else {
      throw new WordleMainError(HttpStatus.NOT_FOUND, ['User not found']);
    }
  }
}
