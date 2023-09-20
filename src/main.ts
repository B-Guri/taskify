import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { TransformInterceptor } from './transform.interceptor';

console.log(process.env.NODE);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new TransformInterceptor());
  const PORT = process.env.PORT || 3001;
  await app.listen(PORT);
  console.log(`App listening on port ${PORT}`);
}
bootstrap();
