import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('managers')
export class Manager {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => User, (user) => user.manager)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ nullable: true })
  unit: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}