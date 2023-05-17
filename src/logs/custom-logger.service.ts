import { Injectable, ConsoleLogger } from '@nestjs/common';
import { ConsoleLoggerOptions } from '@nestjs/common/services/console-logger.service';
import { ConfigService } from '@nestjs/config';
import getLogLevels from '../utils/getLogLevels';
import LogsService from './logs.service';

@Injectable()
export default class CustomLogger extends ConsoleLogger {
  private readonly logsService: LogsService;

  constructor(
    context: string,
    options: ConsoleLoggerOptions,
    configService: ConfigService,
    logsService: LogsService,
  ) {
    const environment = configService.get('NODE_ENV');

    super(context, {
      ...options,
      logLevels: getLogLevels(environment === 'production'),
    });

    this.logsService = logsService;
  }

  log(message: string, context?: string) {
    super.log.apply(this, [message, context]);

    try {
      this.logsService.createLog({
        ...JSON.parse(context),
        level: 'log',
      });
    } catch {}
  }
  error(message: string, stack?: string, context?: string) {
    super.error.apply(this, [message, stack, context]);

    try {
      this.logsService.createLog({
        ...JSON.parse(context),
        level: 'error',
      });
    } catch {}
  }
  warn(message: string, context?: string) {
    super.warn.apply(this, [message, context]);

    try {
      this.logsService.createLog({
        ...JSON.parse(context),
        level: 'warn',
      });
    } catch {}
  }
  debug(message: string, context?: string) {
    super.debug.apply(this, [message, context]);

    try {
      this.logsService.createLog({
        ...JSON.parse(context),
        level: 'debug',
      });
    } catch {}
  }
  verbose(message: string, context?: string) {
    super.debug.apply(this, [message, context]);

    try {
      this.logsService.createLog({
        ...JSON.parse(context),
        level: 'verbose',
      });
    } catch {}
  }
}
