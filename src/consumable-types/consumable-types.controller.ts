import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ConsumableTypesService } from './consumable-types.service';
import AddConsumableTypeDto from './dto/AddConsumableType.dto';
import { RolesGuard } from '../guards/role.guard';
import Roles from '../decorators/roles.decorator';

@Controller('consumable-types')
@UseGuards(RolesGuard)
@Roles('admin')
export class ConsumableTypesController {
  constructor(private consumableTypesService: ConsumableTypesService) {}

  @Get('')
  getAll() {
    return this.consumableTypesService.getAll();
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.consumableTypesService.getById(id);
  }

  @Post()
  add(@Body() dto: AddConsumableTypeDto) {
    return this.consumableTypesService.add(dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.consumableTypesService.delete(id);
  }
}
