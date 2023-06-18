import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as path from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });  
  app.useStaticAssets(path.join(__dirname, '..', 'uploads'));
  app.useGlobalPipes(new ValidationPipe())
  
  await app.listen(3005)

  console.log(`server on 3005`)
}
bootstrap();
