import { IsEmail, IsNotEmpty, Length, Matches } from 'class-validator';

export class SignUpDto {
  @IsEmail()
  email: string;

  @Length(6, 20)
  @IsNotEmpty()
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)
  password: string;
}
