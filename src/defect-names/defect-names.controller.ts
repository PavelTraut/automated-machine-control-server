import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { DefectNamesService } from './defect-names.service';
import { RolesGuard } from '../guards/role.guard';
import Roles from '../decorators/roles.decorator';

@Controller('defect-names')
@UseGuards(RolesGuard)
export class DefectNamesController {
  constructor(private readonly defectNamesService: DefectNamesService) {}

  @Get()
  @Roles('all')
  getAll(@Query('name') name: string) {
    return this.defectNamesService.getAll(name);
  }
}
