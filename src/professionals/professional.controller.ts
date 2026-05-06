import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ProfessionalsService } from './professional.service';
import { Professional } from './entities/professional.entity';

@Controller('professionals')
export class ProfessionalsController {
  constructor(private readonly professionalsService: ProfessionalsService) {}

  @Post()
  create(@Body() body: Partial<Professional>) {
    return this.professionalsService.create(body);
  }

  @Get()
  findAll() {
    return this.professionalsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.professionalsService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: Partial<Professional>) {
    return this.professionalsService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.professionalsService.remove(id);
  }
}