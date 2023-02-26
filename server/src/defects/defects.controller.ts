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
import { DefectsService } from './defects.service';
import AddDefectDto from './dto/AddDefect.dto';
import UpdateDefectDto from './dto/UpdateDefect.dto';
import { RolesGuard } from '../guards/role.guard';
import Roles from '../decorators/roles.decorator';

@Controller('defects')
@UseGuards(RolesGuard)
@Roles('all')
export class DefectsController {
  constructor(private readonly defectsService: DefectsService) {}

  @Get()
  getAll() {
    return this.defectsService.getAll();
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.defectsService.getById(id);
  }

  @Post()
  add(@Body() addDefectDto: AddDefectDto) {
    return this.defectsService.add(addDefectDto);
  }

  @Put()
  update(@Body() updateDefectDto: UpdateDefectDto) {
    return this.defectsService.update(updateDefectDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.defectsService.delete(id);
  }
}
