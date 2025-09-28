
import { Controller, Post, Delete, Param, Body, Headers } from '@nestjs/common';
import { AnnouncementsService } from '../announcements/announcements.service';

@Controller('announcements/:id/reactions')
export class ReactionsController {
  constructor(private readonly service: AnnouncementsService) {}

  @Post()
  addReaction(
    @Param('id') id: string,
    @Body() body: { type: 'up' | 'down' | 'heart' },
    @Headers('x-user-id') userId: string,
  ) {
    return this.service.addReaction(Number(id), userId, body.type);
  }

  @Delete()
  removeReaction(@Param('id') id: string, @Headers('x-user-id') userId: string) {
    return this.service.removeReaction(Number(id), userId);
  }
}
