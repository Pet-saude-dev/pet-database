import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ManagersService } from './manager.service';
import { Manager } from './entities/manager.entity';

@Controller('managers')
export class ManagersController {
  constructor(private readonly managersService: ManagersService) {}

  @Post()
  create(@Body() body: Partial<Manager>) {
    return this.managersService.create(body);
  }

  @Get()
  findAll() {
    return this.managersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.managersService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: Partial<Manager>) {
    return this.managersService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.managersService.remove(id);
  }
}