import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Manager } from './entities/manager.entity';

@Injectable()
export class ManagersService {
  constructor(
    @InjectRepository(Manager)
    private readonly managerRepository: Repository<Manager>,
  ) {}

  async create(data: Partial<Manager>): Promise<Manager> {
    const manager = this.managerRepository.create(data);
    return this.managerRepository.save(manager);
  }

  async findAll(): Promise<Manager[]> {
    return this.managerRepository.find({ relations: ['user'] });
  }

  async findOne(id: string): Promise<Manager> {
    const manager = await this.managerRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!manager) throw new NotFoundException(`Gestor ${id} não encontrado`);
    return manager;
  }

  async update(id: string, data: Partial<Manager>): Promise<Manager> {
    await this.managerRepository.update(id, data);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.managerRepository.delete(id);
  }
}