import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { DefectsService } from './defects.service';
import AddDefectDto from './dto/AddDefect.dto';
import UpdateDefectDto from './dto/UpdateDefect.dto';
import { RolesGuard } from '../guards/role.guard';
import Roles from '../decorators/roles.decorator';
import GetUser from '../decorators/get-user.decorator';
import User from '../entitys/user.entity';

@Controller('defects')
@UseGuards(RolesGuard)
export class DefectsController {
  constructor(private readonly defectsService: DefectsService) {}

  @Get()
  @Roles('all')
  getAll(
    @GetUser() user: User,
    @Query('machine') machineId: string,
    @Query('departament') departament: string,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
    @Query('all') all: string,
  ) {
    if (departament) {
      return this.defectsService.getByDepartament({
        departament,
        startDate,
        endDate,
      });
    }

    if (machineId) {
      return this.defectsService.getByMachine(machineId);
    }

    return this.defectsService.getAll({
      startDate,
      endDate,
    });
  }

  @Get(':id')
  @Roles('all')
  getById(@Param('id') id: string) {
    return this.defectsService.getById(id);
  }

  @Post()
  @Roles('all')
  add(@Body() addDefectDto: AddDefectDto) {
    return this.defectsService.add(addDefectDto);
  }

  @Put()
  @Roles('all')
  update(@Body() updateDefectDto: UpdateDefectDto) {
    return this.defectsService.update(updateDefectDto);
  }

  @Delete(':id')
  @Roles('admin')
  delete(@Param('id') id: string, @Query('check') check: boolean) {
    if (check) {
      return this.defectsService.deleteWithCheck(id);
    }

    return this.defectsService.delete(id);
  }
}
