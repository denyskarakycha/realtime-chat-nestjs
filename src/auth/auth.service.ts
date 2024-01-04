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
import { JwtResponse } from './dto/jwt-response.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private confgService: ConfigService,
    // private ChatGateway: WsChatGateway,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<void> {
    const { email, password, nickname } = signUpDto;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    return this.userService.createUser(email, hashedPassword, nickname);
  }

  async logIn(logInDto: LogInDto): Promise<JwtResponse> {
    const { email, password } = logInDto;

    const user = await this.userService.getUser(email);

    if (!user) {
      throw new UnauthorizedException('Check your login credentials');
    }

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

  async getJwtPayload(
    authorizationHeader: string | null,
  ): Promise<JwtPayload | null> {
    if (!authorizationHeader) {
      return null;
    }
    const jwt = authorizationHeader.split(' ')[1];
    try {
      const jwtPayload: JwtPayload = this.jwtService.verify(jwt);
      return jwtPayload;
    } catch (err) {
      return null;
    }
  }

  async refreshToken(user: User): Promise<{ accessToken: string }> {
    const isExistUser = await this.userService.getUser(user.email);

    if (!isExistUser) {
      throw new NotFoundException('User not Found');
    }

    const payload: JwtPayload = {
      id: isExistUser.id,
      email: isExistUser.email,
    };

    const accessToken: string = this.jwtService.sign(payload);

    // this.ChatGateway.updateToken(isExistUser.id, accessToken);

    return { accessToken };
  }
}
