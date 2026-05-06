import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { ChatSessionsService } from './chat-session.service';
import { ChatSession } from './entities/chat-session.entity';

@Controller('chat-sessions')
export class ChatSessionsController {
  constructor(private readonly chatSessionsService: ChatSessionsService) {}

  @Post()
  create(@Body() body: Partial<ChatSession>) {
    return this.chatSessionsService.create(body);
  }

  @Get()
  findAll() {
    return this.chatSessionsService.findAll();
  }

  @Get('user/:userId')
  findByUser(@Param('userId') userId: string) {
    return this.chatSessionsService.findByUser(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.chatSessionsService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.chatSessionsService.remove(id);
  }
}