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
    console.log(
      !process.env.SAVE_LOGS || +process.env.SAVE_LOGS == 0,
      !process.env.SAVE_LOGS,
      +process.env.SAVE_LOGS == 0,
    );
    if (!process.env.SAVE_LOGS || +process.env.SAVE_LOGS == 0) {
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
