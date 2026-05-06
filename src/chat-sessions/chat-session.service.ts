import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChatSession } from './entities/chat-session.entity';

@Injectable()
export class ChatSessionsService {
  constructor(
    @InjectRepository(ChatSession)
    private readonly chatSessionRepository: Repository<ChatSession>,
  ) {}

  async create(data: Partial<ChatSession>): Promise<ChatSession> {
    const session = this.chatSessionRepository.create(data);
    return this.chatSessionRepository.save(session);
  }

  async findAll(): Promise<ChatSession[]> {
    return this.chatSessionRepository.find({ relations: ['user'] });
  }

  async findOne(id: string): Promise<ChatSession> {
    const session = await this.chatSessionRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!session) throw new NotFoundException(`Sessão ${id} não encontrada`);
    return session;
  }

  async findByUser(userId: string): Promise<ChatSession[]> {
    return this.chatSessionRepository.find({
      where: { user: { id: userId } },
      relations: ['user'],
    });
  }

  async remove(id: string): Promise<void> {
    await this.chatSessionRepository.delete(id);
  }
}