import { Injectable } from '@nestjs/common';
import { DirectRepository } from './repository/direct.repository';
import { Account } from 'src/account/entities/account.entity';
import { Direct } from './entities/direct.entity';

@Injectable()
export class DirectService {
  constructor(private directRepository: DirectRepository) {}

  async createDirect(sender: Account, recipient: Account): Promise<Direct> {
    return this.directRepository.createDirect(sender, recipient);
  }

  async getDirectByAccount(sender: Account): Promise<Direct> {
    return this.directRepository.findDirectByAccount(sender);
  }
}
