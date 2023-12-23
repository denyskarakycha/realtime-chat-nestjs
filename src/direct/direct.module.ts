import { Module } from '@nestjs/common';
import { DirectService } from './direct.service';
//import { DirectController } from './direct.controller';

@Module({
  providers: [DirectService],
})
export class DirectModule {}
