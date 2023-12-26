import { Direct } from 'src/direct/entities/direct.entity';
import { Conversation } from '../../conversation/entities/conversation.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Account {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  nickname: string;

  @OneToOne(() => User, (user) => user.account)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToMany(() => Direct, (direct) => direct.members)
  @JoinTable({
    name: 'account_direct',
    joinColumn: {
      name: 'account_id',
      referencedColumnName: 'id',
      foreignKeyConstraintName: 'account_direct_account_id',
    },
    inverseJoinColumn: {
      name: 'direct_id',
      referencedColumnName: 'id',
      foreignKeyConstraintName: 'account_direct_direct_id',
    },
  })
  directs: Direct[];

  @OneToMany(() => Conversation, (conversation) => conversation.creator)
  createdConversations: Conversation[];

  @ManyToMany(() => Conversation, (conversation) => conversation.participans)
  @JoinTable({
    name: 'account_conversation',
    joinColumn: {
      name: 'account_id',
      referencedColumnName: 'id',
      foreignKeyConstraintName: 'account_conversation_account_id',
    },
    inverseJoinColumn: {
      name: 'conversation_id',
      referencedColumnName: 'id',
      foreignKeyConstraintName: 'account_conversation_conversation_id',
    },
  })
  conversations: Conversation[];
}
