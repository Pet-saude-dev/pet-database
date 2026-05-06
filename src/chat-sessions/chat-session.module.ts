import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatSession } from './entities/chat-session.entity';
import { ChatSessionsService } from './chat-session.service';
import { ChatSessionsController } from './chat-session.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ChatSession])],
  providers: [ChatSessionsService],
  controllers: [ChatSessionsController],
  exports: [ChatSessionsService],
})
export class ChatSessionsModule {}