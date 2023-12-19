import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { SignUpDto } from './dto/sign-up.dto';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  signUp(signUpDto: SignUpDto): Promise<void> {
    const { email, password } = signUpDto;
    return this.userService.createUser(email, password);
  }
}
