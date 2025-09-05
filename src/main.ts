import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:5173',
  });

  await app.listen(4000);
  console.log('🚀 Backend running on http://localhost:4000');
}
bootstrap();
