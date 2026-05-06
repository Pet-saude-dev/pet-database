import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Professional } from './entities/professional.entity';
import { ProfessionalsService } from './professional.service';
import { ProfessionalsController } from './professional.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Professional])],
  providers: [ProfessionalsService],
  controllers: [ProfessionalsController],
  exports: [ProfessionalsService],
})
export class ProfessionalsModule {}