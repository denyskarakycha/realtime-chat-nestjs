import { Module } from '@nestjs/common';
import { DirectService } from './direct.service';
import { DirectRepository } from './repository/direct.repository';
//import { DirectController } from './direct.controller';

@Module({
  providers: [DirectService, DirectRepository],
  exports: [DirectService, DirectRepository],
})
export class DirectModule {}
