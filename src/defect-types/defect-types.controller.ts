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
import { DefectTypesService } from './defect-types.service';
import { RolesGuard } from '../guards/role.guard';
import Roles from '../decorators/roles.decorator';
import UpdateTypeDto from './dto/UpdateType.dto';
import AddTypeDto from './dto/AddType.dto';

@Controller('defect-types')
@UseGuards(RolesGuard)
export class DefectTypesController {
  constructor(private defectTypesService: DefectTypesService) {}

  @Get()
  @Roles('all')
  getAll() {
    return this.defectTypesService.getAll();
  }

  @Get(':id')
  @Roles('all')
  getById(@Param('id') id: string) {
    return this.defectTypesService.getById(id);
  }

  @Post()
  @Roles('admin')
  add(@Body() dto: AddTypeDto) {
    return this.defectTypesService.add(dto);
  }

  @Put()
  @Roles('admin')
  update(@Body() dto: UpdateTypeDto) {
    return this.defectTypesService.update(dto);
  }

  @Delete(':id')
  @Roles('admin')
  delete(@Param('id') id: string) {
    return this.defectTypesService.delete(id);
  }
}
