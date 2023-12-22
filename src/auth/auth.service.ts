import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { SignUpDto } from './dto/sign-up.dto';
import * as bcrypt from 'bcrypt';
import { LogInDto } from './dto/log-in.dto';
import { JwtPayload } from './interface/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private confgService: ConfigService,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<void> {
    const { email, password } = signUpDto;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    return this.userService.createUser(email, hashedPassword);
  }

  async logIn(
    logInDto: LogInDto,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const { email, password } = logInDto;

    const user = await this.userService.findUser(email);

    const isEqual = await bcrypt.compare(password, user.password);
    if (user && isEqual) {
      const payload: JwtPayload = { id: user.id, email: user.email };
      const accessToken: string = this.jwtService.sign(payload);
      const refreshToken: string = this.jwtService.sign(payload, {
        secret: this.confgService.get('JWT_REFRESH_SECRET'),
        expiresIn: '7d',
      });
      return { accessToken: accessToken, refreshToken: refreshToken };
    } else {
      throw new UnauthorizedException('Check your login credentials');
    }
  }

  async refreshToken(user: User): Promise<{ accessToken: string }> {
    const isExistUser = await this.userService.findUser(user.email);

    if (!isExistUser) {
      throw new NotFoundException('User not Found');
    }

    const payload: JwtPayload = {
      id: isExistUser.id,
      email: isExistUser.email,
    };

    const accessToken: string = this.jwtService.sign(payload);

    return { accessToken };
  }
}
