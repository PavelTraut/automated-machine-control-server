import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
  Put,
} from '@nestjs/common';
import { RolesGuard } from '../guards/role.guard';
import Roles from '../decorators/roles.decorator';
import CreateMachineDto from './dto/CreateMachine.dto';
import { MachinesService } from './machines.service';
import UpdateMachineDto from './dto/UpdateMachine.dto';

@Controller('machines')
@UseGuards(RolesGuard)
@Roles('admin')
export class MachinesController {
  constructor(private readonly machinesService: MachinesService) {}
  @Post()
  add(@Body() createMachineDto: CreateMachineDto) {
    return this.machinesService.add(createMachineDto);
  }

  @Get()
  getAll() {
    return this.machinesService.getAll();
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.machinesService.getById(id);
  }

  @Put()
  update(@Body() updateMachineDto: UpdateMachineDto) {
    return this.machinesService.update(updateMachineDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.machinesService.delete('id');
  }
}
