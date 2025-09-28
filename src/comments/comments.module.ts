

import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { AnnouncementsModule } from '../announcements/announcements.module'; // ✅ import

@Module({
  imports: [AnnouncementsModule], // ✅ allow injection of AnnouncementsService
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule {}
