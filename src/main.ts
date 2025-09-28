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

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AnnouncementsModule } from './announcements/announcements.module';
import { CommentsModule } from './comments/comments.module';
import { ReactionsModule } from './reactions/reactions.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // ← reads .env automatically
    AnnouncementsModule,
    CommentsModule,
    ReactionsModule,
  ],
})
export class AppModule {}
