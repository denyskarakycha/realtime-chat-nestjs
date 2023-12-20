import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { SignUpDto } from './dto/sign-up.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiCreatedResponse()
  @Post('/signup')
  signUp(@Body() signUpDto: SignUpDto): Promise<void> {
    return this.authService.signUp(signUpDto);
  }

  @ApiOkResponse()
  @HttpCode(HttpStatus.OK)
  @Post('/login')
  logIn(@Body() logInDto: SignUpDto) {
    return this.authService.logIn(logInDto);
  }
}
