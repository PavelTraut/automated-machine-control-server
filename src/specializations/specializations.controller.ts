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
import { SpecializationsService } from './specializations.service';
import AddSpecializationDto from './dto/AddSpecialization.dto';
import UpdateSpecializationDto from './dto/UpdateSpecialization.dto';
import Roles from '../decorators/roles.decorator';
import { RolesGuard } from '../guards/role.guard';

@Controller('specializations')
@UseGuards(RolesGuard)
export class SpecializationsController {
  constructor(
    private readonly specializationsService: SpecializationsService,
  ) {}

  @Get()
  @Roles('all')
  getAll() {
    return this.specializationsService.getAll();
  }

  @Get(':id')
  @Roles('all')
  get(@Param('id') id: string) {
    return this.specializationsService.getById(id);
  }

  @Post()
  @Roles('admin')
  add(@Body() dto: AddSpecializationDto) {
    return this.specializationsService.add(dto);
  }

  @Put()
  @Roles('admin')
  update(@Body() dto: UpdateSpecializationDto) {
    return this.specializationsService.update(dto);
  }

  @Delete(':id')
  @Roles('admin')
  delete(@Param('id') id: string) {
    return this.specializationsService.delete(id);
  }
}
