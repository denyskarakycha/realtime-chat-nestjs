import { Account } from 'src/account/entities/account.entity';
import { Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Direct {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToMany(() => Account, (account) => account.directs)
  members: Account[];
}
