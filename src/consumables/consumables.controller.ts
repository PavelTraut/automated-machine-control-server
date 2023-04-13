import { Body, Controller, Get, Post } from '@nestjs/common';
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

  @Post()
  add(@Body() dto: CreateConsumableDto) {
    return this.consumablesService.add(dto);
  }
}
