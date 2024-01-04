import { ApiProperty } from '@nestjs/swagger';
import { Account } from 'src/account/entities/account.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Conversation {
  @ApiProperty({ example: 'uuid' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'Conversation' })
  @Column({ unique: true })
  title: string;

  @ApiProperty({ type: () => Account })
  @ManyToOne(() => Account, (account) => account.createdConversations)
  @JoinColumn({ name: 'creator_id' })
  creator: Account;

  @ApiProperty({ type: () => [Account] })
  @ManyToMany(() => Account, (account) => account.conversations)
  participans: Account[];

  @ApiProperty({ example: '2024-01-03T06:14:21.744Z' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ example: '2024-01-03T06:14:21.744Z' })
  @UpdateDateColumn()
  updatedAt: Date;
}
