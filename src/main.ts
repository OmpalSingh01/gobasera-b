
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const origins = [
    configService.get('FRONTEND_DEV') || 'http://localhost:5173',
    configService.get('FRONTEND_PROD') || 'https://gobasera-f.vercel.app',
    'https://gobasera-8w7rgd6g6-ompalsinghs-projects.vercel.app', // temporary/test URL
  ];

  app.enableCors({ origin: origins });

  const port = parseInt(configService.get<string>('PORT') ?? '4000', 10);

  await app.listen(port, '0.0.0.0');
  console.log(`🚀 Backend running on port ${port}`);
}
bootstrap();

