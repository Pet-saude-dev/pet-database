import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Appointment } from '../../appointments/entities/appointment.entity';

@Entity('professionals')
export class Professional {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => User, (user) => user.professional)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  specialty: string;

  @Column({ nullable: true })
  crm: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @OneToMany(() => Appointment, (appointment) => appointment.professional)
  appointments: Appointment[];
}