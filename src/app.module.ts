import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { Professional } from './professionals/entities/professional.entity';
import { Manager } from './managers/entities/manager.entity';
import { ChatSession } from './chat-sessions/entities/chat-session.entity';
import { Appointment } from './appointments/entities/appointment.entity';
import { UsersModule } from './users/users.module';
import { ProfessionalsModule } from './professionals/professionals.module';
import { ManagersModule } from './managers/managers.module';
import { ChatSessionsModule } from './chat-sessions/chat-sessions.module';
import { AppointmentsModule } from './appointments/appointments.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: [User, Professional, Manager, ChatSession, Appointment],
      synchronize: true,
      ssl: { rejectUnauthorized: false },
    }),
    UsersModule,
    ProfessionalsModule,
    ManagersModule,
    ChatSessionsModule,
    AppointmentsModule,
  ],
})
export class AppModule {}