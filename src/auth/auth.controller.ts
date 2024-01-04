import {
  Get,
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { SignUpDto } from './dto/sign-up.dto';
import { RefreshJwtGuard } from './guard/refresh-jwt.guard';
import { User } from 'src/user/entities/user.entity';
import { GetUser } from 'src/user/decorators/get-user.decorator';
import { LogInDto } from './dto/log-in.dto';
import { JwtResponse } from './dto/jwt-response.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiCreatedResponse()
  @Post('/signup')
  signUp(@Body() signUpDto: SignUpDto): Promise<void> {
    return this.authService.signUp(signUpDto);
  }

  @ApiOkResponse({ type: JwtResponse })
  @HttpCode(HttpStatus.OK)
  @Post('/login')
  logIn(@Body() logInDto: LogInDto): Promise<JwtResponse> {
    return this.authService.logIn(logInDto);
  }

  @ApiOkResponse({
    content: {
      'application/json': {
        example: {
          refreshToken: 'refreshToken',
        },
      },
    },
  })
  @HttpCode(HttpStatus.OK)
  @UseGuards(RefreshJwtGuard)
  @Get('/refresh')
  refreshToken(@GetUser() user: User): Promise<{ accessToken: string }> {
    return this.authService.refreshToken(user);
  }
}
