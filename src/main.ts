import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'https://gobasera-f.vercel.app/',
  });

  await app.listen(4000);
  console.log('🚀 Backend running ');
}
bootstrap();
