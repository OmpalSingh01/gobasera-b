// import { Module } from '@nestjs/common';
// import { AnnouncementsModule } from './announcements/announcements.module';
// import { CommentsModule } from './comments/comments.module';
// import { ReactionsModule } from './reactions/reactions.module';

// @Module({
//   imports: [AnnouncementsModule, CommentsModule, ReactionsModule],
// })
// export class AppModule {}

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AnnouncementsModule } from './announcements/announcements.module';
import { CommentsModule } from './comments/comments.module';
import { ReactionsModule } from './reactions/reactions.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // ← makes process.env available everywhere
    AnnouncementsModule,
    CommentsModule,
    ReactionsModule,
  ],
})
export class AppModule {}
