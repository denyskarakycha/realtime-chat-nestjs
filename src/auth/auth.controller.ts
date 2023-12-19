import { Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiCreatedResponse()
  @Post('/signup')
  signUp() {}

  @ApiOkResponse()
  @HttpCode(HttpStatus.OK)
  @Post('/login')
  logIn() {}
}
