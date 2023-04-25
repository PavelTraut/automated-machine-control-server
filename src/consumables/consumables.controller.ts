import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ConsumablesService } from './consumables.service';
import Roles from '../decorators/roles.decorator';
import CreateConsumableDto from './dto/CreateConsumable.dto';

@Controller('consumables')
@Roles('all')
export class ConsumablesController {
  constructor(private consumablesService: ConsumablesService) {}

  @Get()
  getAll() {
    return this.consumablesService.getAll();
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.consumablesService.getById(id);
  }

  @Post()
  add(@Body() dto: CreateConsumableDto) {
    return this.consumablesService.add(dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.consumablesService.delete(id);
  }
}
