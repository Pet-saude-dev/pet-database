import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Professional } from './entities/professional.entity';

@Injectable()
export class ProfessionalsService {
  constructor(
    @InjectRepository(Professional)
    private readonly professionalRepository: Repository<Professional>,
  ) {}

  async create(data: Partial<Professional>): Promise<Professional> {
    const professional = this.professionalRepository.create(data);
    return this.professionalRepository.save(professional);
  }

  async findAll(): Promise<Professional[]> {
    return this.professionalRepository.find({ relations: ['user'] });
  }

  async findOne(id: string): Promise<Professional> {
    const professional = await this.professionalRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!professional) throw new NotFoundException(`Profissional ${id} não encontrado`);
    return professional;
  }

  async update(id: string, data: Partial<Professional>): Promise<Professional> {
    await this.professionalRepository.update(id, data);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.professionalRepository.delete(id);
  }
}