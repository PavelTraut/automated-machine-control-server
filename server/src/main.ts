import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import CustomLogger from './logs/custom-logger.service';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  app.useLogger(app.get(CustomLogger));
  app.use(cookieParser());

  await app.listen(3000);
}

bootstrap();
