import { ApiProperty } from '@nestjs/swagger';

export class JwtResponse {
  @ApiProperty({ example: 'accessToken' })
  accessToken: string;

  @ApiProperty({ example: 'refreshToken' })
  refreshToken: string;
}
