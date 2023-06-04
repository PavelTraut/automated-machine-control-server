import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
  Put,
  Query,
} from '@nestjs/common';
import { RolesGuard } from '../guards/role.guard';
import Roles from '../decorators/roles.decorator';
import CreateMachineDto from './dto/CreateMachine.dto';
import { MachinesService } from './machines.service';
import UpdateMachineDto from './dto/UpdateMachine.dto';
import GetUser from '../decorators/get-user.decorator';
import User from '../entitys/user.entity';

@Controller('machines')
@UseGuards(RolesGuard)
export class MachinesController {
  constructor(private readonly machinesService: MachinesService) {}

  @Post()
  @Roles('worker')
  add(@Body() createMachineDto: CreateMachineDto) {
    return this.machinesService.add(createMachineDto);
  }
  @Get()
  @Roles('all')
  getAll(@GetUser() user: User, @Query('departament') departament: string) {
    if (departament) {
      return this.machinesService.getByDepartament(departament);
    }
    return this.machinesService.getAll();
  }

  @Get(':id')
  @Roles('all')
  getById(@Param('id') id: string) {
    return this.machinesService.getById(id);
  }

  @Put()
  @Roles('worker')
  update(@Body() updateMachineDto: UpdateMachineDto) {
    return this.machinesService.update(updateMachineDto);
  }
  @Delete(':id')
  @Roles('admin')
  delete(@Param('id') id: string) {
    return this.machinesService.delete(id);
  }
}
