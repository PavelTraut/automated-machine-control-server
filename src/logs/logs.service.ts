import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Log from 'src/entitys/log.entity';
import { Repository } from 'typeorm';
import CreateLogDto from './dto/CreateLogDto';
import * as process from 'process';

@Injectable()
export default class LogsService {
  constructor(
    @InjectRepository(Log)
    private logsRepository: Repository<Log>,
  ) {}

  async createLog(log: CreateLogDto) {
    if (!process.env.SAVE_LOGS) {
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
