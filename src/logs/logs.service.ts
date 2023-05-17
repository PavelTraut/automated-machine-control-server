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

  getLogs({ page = 0, limit = 10 }) {
    return this.logsRepository.find({
      order: { creationDate: 'DESC' },
      take: limit,
      skip: limit * (page - 1),
    });
  }

  count() {
    return this.logsRepository.count();
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
