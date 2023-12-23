import { Account } from 'src/account/entities/account.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Conversation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @ManyToOne(() => Account, (account) => account.createdConversations)
  @JoinColumn({ name: 'creator_id' })
  creator: Account;

  @ManyToMany(() => Account, (account) => account.conversations)
  participans: Account[];
}
