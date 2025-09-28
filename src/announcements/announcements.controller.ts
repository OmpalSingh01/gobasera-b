
import { Controller, Get, Post, Patch, Param, Body } from '@nestjs/common';
import { AnnouncementsService } from './announcements.service';

@Controller('announcements')
export class AnnouncementsController {
  constructor(private readonly service: AnnouncementsService) {}

  @Post()
  create(@Body() body: { title: string; description?: string }) {
    return this.service.create(body.title, body.description);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Patch(':id')
  updateStatus(@Param('id') id: string, @Body() body: { status: 'active' | 'closed' }) {
    return this.service.updateStatus(Number(id), body.status);
  }
}
