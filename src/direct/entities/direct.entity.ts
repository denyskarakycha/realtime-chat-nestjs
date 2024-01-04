import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty({ example: 'uuid' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ type: () => [Account] })
  @ManyToMany(() => Account, (account) => account.directs)
  members: Account[];

  @ApiProperty({ example: '2024-01-03T06:14:21.744Z' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ example: '2024-01-03T06:14:21.744Z' })
  @UpdateDateColumn()
  updatedAt: Date;
}
