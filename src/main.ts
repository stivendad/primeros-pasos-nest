import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Solo deja pasar la data que este validada por decoradores en el DTO
      forbidNonWhitelisted: true, // Si se pasa data no solicitada responde un error 400
    })
  );

  await app.listen(3000);
}
bootstrap();
