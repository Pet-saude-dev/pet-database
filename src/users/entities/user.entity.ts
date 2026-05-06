import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { ChatSession } from '../../chat-sessions/entities/chat-session.entity';
import { Appointment } from '../../appointments/entities/appointment.entity';
import { Professional } from '../../professionals/entities/professional.entity';
import { Manager } from '../../managers/entities/manager.entity';

export enum UserRole {
  PATIENT = 'patient',
  PROFESSIONAL = 'professional',
  MANAGER = 'manager',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  cpf: string;

  @Column({ name: 'birth_date' })
  birthDate: string;

  @Column({ name: 'social_name', nullable: true })
  socialName: string;

  @Column({ nullable: true })
  sex: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.PATIENT })
  role: UserRole;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @OneToMany(() => ChatSession, (session) => session.user)
  chatSessions: ChatSession[];

  @OneToMany(() => Appointment, (appointment) => appointment.user)
  appointments: Appointment[];

  @OneToOne(() => Professional, (professional) => professional.user)
  professional: Professional;

  @OneToOne(() => Manager, (manager) => manager.user)
  manager: Manager;
}