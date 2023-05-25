import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ConsumableTypesService } from './consumable-types.service';
import AddConsumableTypeDto from './dto/AddConsumableType.dto';
import { RolesGuard } from '../guards/role.guard';
import Roles from '../decorators/roles.decorator';
import UpdateConsumbleTypeDto from './dto/UpdateConsumbleType.dto';

@Controller('consumable-types')
@UseGuards(RolesGuard)
export class ConsumableTypesController {
  constructor(private consumableTypesService: ConsumableTypesService) {}

  @Get('')
  @Roles('all')
  getAll() {
    return this.consumableTypesService.getAll();
  }

  @Get(':id')
  @Roles('all')
  getById(@Param('id') id: string) {
    return this.consumableTypesService.getById(id);
  }

  @Post()
  @Roles('admin')
  add(@Body() dto: AddConsumableTypeDto) {
    return this.consumableTypesService.add(dto);
  }

  @Put()
  @Roles('admin')
  update(@Body() dto: UpdateConsumbleTypeDto) {
    return this.consumableTypesService.update(dto);
  }

  @Delete(':id')
  @Roles('admin')
  delete(@Param('id') id: string) {
    return this.consumableTypesService.delete(id);
  }
}
