// import { Module } from '@nestjs/common';
// import { ReactionsController } from './reactions.controller';
// import { ReactionsService } from './reactions.service';

// @Module({
//   controllers: [ReactionsController],
//   providers: [ReactionsService],
// })
// export class ReactionsModule {}


// reactions.module.ts
import { Module } from '@nestjs/common';
import { ReactionsController } from './reactions.controller';
import { ReactionsService } from './reactions.service';
import { AnnouncementsModule } from '../announcements/announcements.module';

@Module({
  imports: [AnnouncementsModule], // ← important to access AnnouncementsService
  controllers: [ReactionsController],
  providers: [ReactionsService],
})
export class ReactionsModule {}

