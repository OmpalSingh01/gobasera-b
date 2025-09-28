
import { Controller, Post, Get, Param, Body, Query } from '@nestjs/common';
import { AnnouncementsService } from '../announcements/announcements.service';

@Controller('announcements/:id/comments')
export class CommentsController {
  constructor(private readonly service: AnnouncementsService) {}

  @Post()
  addComment(
    @Param('id') id: string,
    @Body() body: { authorName: string; text: string },
  ) {
    return this.service.addComment(Number(id), body.authorName, body.text);
  }

  @Get()
  getComments(@Param('id') id: string) {
    const ann = this.service.findAll().find(a => a.id === Number(id));
    return ann?.comments || [];
  }
}
