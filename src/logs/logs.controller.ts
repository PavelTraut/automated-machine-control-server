import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { RolesGuard } from '../guards/role.guard';
import Roles from '../decorators/roles.decorator';
import LogsService from './logs.service';

@Controller('logs')
@UseGuards(RolesGuard)
export class LogsController {
  constructor(private readonly logsService: LogsService) {}

  @Get()
  @Roles('admin')
  get(
    @Query('limit') limit: number,
    @Query('page') page: number,
    @Query('count') count: boolean,
    @Query('endDate') endDate: string,
    @Query('startDate') startDate: string,
  ) {
    if (count) {
      return this.logsService.count({ endDate, startDate });
    }
    return this.logsService.getLogs({ limit, page, endDate, startDate });
  }
}
