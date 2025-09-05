// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);

//   app.enableCors({
//     origin: 'https://gobasera-f.vercel.app/',
//   });

//   await app.listen(4000);
//   console.log('🚀 Backend running ');
// }
// bootstrap();

// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);

//   app.enableCors({
//     origin: 'https://gobasera-f.vercel.app', // no trailing slash
//   });

//   const port = process.env.PORT || 4000; // Render assigns PORT dynamically
//   await app.listen(port);
//   console.log(`🚀 Backend running on port ${port}`);
// }
// bootstrap();


// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);

//   app.enableCors({
//     origin: 'https://gobasera-f.vercel.app', // your Vercel frontend
//   });

//   const port = process.env.PORT || 4000; // Render sets PORT dynamically
//   await app.listen(port, '0.0.0.0');      // important: listen on all interfaces

//   console.log(`🚀 Backend running on port ${port}`);
// }
// bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [
      'http://localhost:5173',           // allow local frontend (dev)
      'https://gobasera-f.vercel.app',   // allow Vercel frontend (prod)
    ],
  });

  const port = process.env.PORT || 4000;
  await app.listen(port, '0.0.0.0');
  console.log(`🚀 Backend running on port ${port}`);
}
bootstrap();
