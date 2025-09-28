// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);

//   app.enableCors({
//     origin: [
//       'http://localhost:5173' ,  // allow local frontend (dev)
//       'https://gobasera-f.vercel.app',   // allow Vercel frontend (prod)
//     ],
//   });

//   const port = process.env.PORT || 4000;
//   await app.listen(port, '0.0.0.0');
//   console.log(`🚀 Backend running on port ${port}`);
// }
// bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.enableCors({
    origin: [
      configService.get('FRONTEND_DEV'),   // dev frontend
      configService.get('FRONTEND_PROD'),  // prod frontend
    ],
  });

  const port = configService.get('PORT') || 4000;
  await app.listen(port, '0.0.0.0');
  console.log(`🚀 Backend running on port ${port}`);
}
bootstrap();
