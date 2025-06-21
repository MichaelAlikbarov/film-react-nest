import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import { ValidationPipe } from '@nestjs/common';
import { DevLogger } from './logger/dev.logger';
import { JsonLogger } from './logger/json.logger';
import { TSKVLogger } from './logger/tskv.logger';
import { MultiLogger } from './logger/multi.logger';

async function bootstrap() {
  const logger = new MultiLogger([
    new DevLogger(),
    new JsonLogger(),
    new TSKVLogger(),
  ]);
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.setGlobalPrefix('api/afisha');
  app.enableCors();
  app.useLogger(logger);
  await app.listen(3000);
}
bootstrap();
