import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { SignUpDto } from './dto/sign-up.dto';
import * as bcrypt from 'bcrypt';
import { LogInDto } from './dto/log-in.dto';
import { JwtPayload } from './interface/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<void> {
    const { email, password } = signUpDto;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    return this.userService.createUser(email, hashedPassword);
  }

  async logIn(logInDto: LogInDto): Promise<{ accessToken: string }> {
    const { email, password } = logInDto;

    const user = await this.userService.findUser(email);

    const isEqual = await bcrypt.compare(password, user.password);
    if (user && isEqual) {
      const payload: JwtPayload = { id: user.id, email: user.email };
      const accessToken: string = this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException('Check your login credentials');
    }
  }
}
