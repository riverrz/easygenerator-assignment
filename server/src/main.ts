import * as cookieParser from 'cookie-parser';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);

  if (config.get('APP_ENV') === 'production') {
    app.enableCors({
      allowedHeaders: ['content-type', 'authorization'],
      origin: 'domain_name',
      credentials: true,
    });
  } else {
    app.enableCors({
      allowedHeaders: ['content-type', 'authorization'],
      origin: 'http://localhost:5173',
      credentials: true,
    });
  }

  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());

  const port = config.get('PORT');
  console.log(`Starting the server on port ${port}`);

  await app.listen(port);
}
bootstrap();
