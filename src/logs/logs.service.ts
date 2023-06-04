import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Log from 'src/entitys/log.entity';
import { Between, FindOptionsWhere, Repository } from 'typeorm';
import CreateLogDto from './dto/CreateLog.dto';
import * as process from 'process';
import GetLogsDto from './dto/GetLogs.dto';
import { startOfDay, endOfDay, parse } from 'date-fns';

@Injectable()
export default class LogsService {
  constructor(
    @InjectRepository(Log)
    private logsRepository: Repository<Log>,
  ) {}

  getLogs({ page = 0, limit = 10, startDate, endDate }: GetLogsDto) {
    const findArgs: FindOptionsWhere<Log> = {
      creationDate:
        (!!startDate &&
          !!endDate &&
          Between(
            startOfDay(parse(startDate, "yyyy-MM-dd'T'HH:mm", new Date())),
            endOfDay(parse(endDate, "yyyy-MM-dd'T'HH:mm", new Date())),
          )) ||
        undefined,
    };

    return this.logsRepository.find({
      order: { creationDate: 'DESC' },
      where: findArgs,
      take: limit,
      skip: limit * (page - 1),
    });
  }

  count({ startDate, endDate }: { startDate: string; endDate: string }) {
    const findArgs: FindOptionsWhere<Log> = {
      creationDate:
        (!!startDate &&
          !!endDate &&
          Between(
            startOfDay(parse(startDate, "yyyy-MM-dd'T'HH:mm", new Date())),
            endOfDay(parse(endDate, "yyyy-MM-dd'T'HH:mm", new Date())),
          )) ||
        undefined,
    };
    return this.logsRepository.count({ where: findArgs });
  }

  async createLog(log: CreateLogDto) {
    if (!process.env.SAVE_LOGS || +process.env.SAVE_LOGS == 0 || !log.action) {
      return;
    }

    const newLog = await this.logsRepository.create(log);
    await this.logsRepository.save(newLog, {
      data: {
        isCreatingLogs: true,
      },
    });
    return newLog;
  }
}
