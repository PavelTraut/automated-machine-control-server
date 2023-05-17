import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { RolesGuard } from '../guards/role.guard';
import Roles from '../decorators/roles.decorator';
import LogsService from './logs.service';

@Controller('logs')
@UseGuards(RolesGuard)
@Roles('user')
export class LogsController {
  constructor(private readonly logsService: LogsService) {}

  @Get()
  get(
    @Query('limit') limit: number,
    @Query('page') page: number,
    @Query('count') count: boolean,
  ) {
    if (count) {
      return this.logsService.count();
    }
    return this.logsService.getLogs({ limit, page });
  }
}
