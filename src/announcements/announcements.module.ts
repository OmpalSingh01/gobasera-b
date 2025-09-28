// import { Module } from '@nestjs/common';
// import { AnnouncementsService } from './announcements.service';
// import { AnnouncementsController } from './announcements.controller';

// @Module({
//   controllers: [AnnouncementsController],
//   providers: [AnnouncementsService],
// })
// export class AnnouncementsModule {}

// announcements.module.ts
import { Module } from '@nestjs/common';
import { AnnouncementsService } from './announcements.service';
import { AnnouncementsController } from './announcements.controller';

@Module({
  providers: [AnnouncementsService],
  controllers: [AnnouncementsController],
  exports: [AnnouncementsService], // ✅ Export to make it available for other modules
})
export class AnnouncementsModule {}
