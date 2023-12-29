import { Account } from 'src/account/entities/account.entity';
import {
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Direct {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToMany(() => Account, (account) => account.directs)
  members: Account[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
