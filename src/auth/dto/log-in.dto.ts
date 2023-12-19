import { IsEmail, Length, Matches } from 'class-validator';

export class LogInDto {
  @IsEmail()
  email: string;

  @Length(6, 20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)
  password: string;
}
