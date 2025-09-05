import {
  Controller,
  Post,
  Get,
  Patch,
  Body,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { AnnouncementsService } from './announcements.service';

@Controller('announcements')
export class AnnouncementsController {
  constructor(private readonly announcementsService: AnnouncementsService) {}

  @Post()
  create(
    @Body('title') title: string,
    @Body('description') description?: string,
  ) {
    return this.announcementsService.create(title, description);
  }

  @Get()
  findAll() {
    return this.announcementsService.findAll();
  }

  @Patch(':id')
  updateStatus(
    @Param('id') id: string,
    @Body('status') status: 'active' | 'closed',
  ) {
    const updated = this.announcementsService.updateStatus(Number(id), status);
    if (!updated) throw new NotFoundException('Announcement not found');
    return updated;
  }
}
