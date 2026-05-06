import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Appointment } from './entities/appointment.entity';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(Appointment)
    private readonly appointmentRepository: Repository<Appointment>,
  ) {}

  async create(data: Partial<Appointment>): Promise<Appointment> {
    const appointment = this.appointmentRepository.create(data);
    return this.appointmentRepository.save(appointment);
  }

  async findAll(): Promise<Appointment[]> {
    return this.appointmentRepository.find({ relations: ['user', 'professional'] });
  }

  async findOne(id: string): Promise<Appointment> {
    const appointment = await this.appointmentRepository.findOne({
      where: { id },
      relations: ['user', 'professional'],
    });
    if (!appointment) throw new NotFoundException(`Agendamento ${id} não encontrado`);
    return appointment;
  }

  async findByUser(userId: string): Promise<Appointment[]> {
    return this.appointmentRepository.find({
      where: { user: { id: userId } },
      relations: ['user', 'professional'],
    });
  }

  async update(id: string, data: Partial<Appointment>): Promise<Appointment> {
    await this.appointmentRepository.update(id, data);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.appointmentRepository.delete(id);
  }
}