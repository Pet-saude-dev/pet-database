import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Manager } from './entities/manager.entity';
import { ManagersService } from './manager.service';
import { ManagersController } from './manager.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Manager])],
  providers: [ManagersService],
  controllers: [ManagersController],
  exports: [ManagersService],
})
export class ManagersModule {}