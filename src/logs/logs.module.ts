import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogsController } from './logs.controller';
import Log from 'src/entitys/log.entity';
import CustomLogger from './custom-logger.service';
import LogsService from './logs.service';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([Log])],
  providers: [LogsService, CustomLogger],
  exports: [CustomLogger],
  controllers: [LogsController],
})
export class LogsModule {}
