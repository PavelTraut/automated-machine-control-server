import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import User from '../entitys/user.entity';
import getLogAction from '../utils/getLogAction';
import * as process from 'process';

@Injectable()
class LogsMiddleware implements NestMiddleware {
  private readonly logger = new Logger('HTTP');

  use(
    request: Request & { user: User },
    response: Response,
    next: NextFunction,
  ) {
    response.on('finish', () => {
      const { method, originalUrl, body, user } = request;
      const { statusCode, statusMessage } = response;

      const message = `${method} ${originalUrl} ${statusCode} ${statusMessage} \nUser: ${JSON.stringify(
        user,
        null,
        2,
      )}\nBody: ${JSON.stringify(body, null, 2)} \n`;

      const context: string =
        +process.env.SAVE_LOGS != 0
          ? JSON.stringify({
              action: getLogAction(originalUrl, method),
              body: JSON.stringify(body || {}),
              status: statusCode.toString(),
              user: user?.login,
            })
          : '{}';

      if (statusCode >= 500) {
        return this.logger.error(message, 'http', context);
      }

      if (statusCode >= 400) {
        return this.logger.warn(message, context);
      }

      return this.logger.log(message, context);
    });

    next();
  }
}

export default LogsMiddleware;
