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
import { RolesGuard } from '../guards/role.guard';
import Roles from '../decorators/roles.decorator';
import AddDepartamentDto from './dto/AddDepartament.dto';
import { DepartamentsService } from './departaments.service';
import UpdateDepartamentDto from './dto/UpdateDepartamentDto';

@Controller('departaments')
@UseGuards(RolesGuard)
export class DepartamentsController {
  constructor(private departamentsService: DepartamentsService) {}

  @Get()
  @Roles('all')
  getAll() {
    return this.departamentsService.getAll();
  }

  @Get(':id')
  @Roles('all')
  get(@Param('id') id: string) {
    return this.departamentsService.getDepartmentById(id);
  }

  @Post()
  @Roles('admin')
  add(@Body() addDepartamentDto: AddDepartamentDto) {
    return this.departamentsService.add(addDepartamentDto);
  }

  @Put()
  @Roles('admin')
  update(@Body() updateDepartamentDto: UpdateDepartamentDto) {
    return this.departamentsService.update(updateDepartamentDto);
  }

  @Delete(':id')
  @Roles('admin')
  delete(@Param('id') id: string) {
    return this.departamentsService.delete(id);
  }
}
