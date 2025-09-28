// import {
//   Controller,
//   Get,
//   Post,
//   Patch,
//   Body,
//   Param,
//   Req,
//   Res,
//   ParseIntPipe,
//   BadRequestException,
// } from '@nestjs/common';
// import type { Request, Response } from 'express';
// import { AnnouncementsService } from './announcements.service';
// import * as crypto from 'crypto';

// @Controller('announcements')
// export class AnnouncementsController {
//   constructor(private readonly announcementsService: AnnouncementsService) {}

//   // Create new announcement
//   @Post()
//   create(
//     @Body('title') title: string,
//     @Body('description') description?: string,
//   ) {
//     if (!title) throw new BadRequestException('Title is required');
//     return this.announcementsService.create(title, description);
//   }

//   // Update announcement status
//   @Patch(':id')
//   updateStatus(
//     @Param('id', ParseIntPipe) id: number,
//     @Body('status') status: 'active' | 'closed',
//   ) {
//     if (!status) throw new BadRequestException('Status is required');
//     const updated = this.announcementsService.updateStatus(id, status);
//     if (!updated) throw new BadRequestException('Announcement not found');
//     return updated;
//   }

//   // Get all announcements with commentCount, reactions, lastActivityAt + ETag caching
//   @Get()
//   getAll(@Req() req: Request, @Res() res: Response) {
//     const announcements = this.announcementsService.getAll();

//     // Generate ETag from JSON hash
//     const etag = crypto
//       .createHash('md5')
//       .update(JSON.stringify(announcements))
//       .digest('hex');

//     // Return 304 Not Modified if client already has latest data
//     if (req.headers['if-none-match'] === etag) {
//       return res.status(304).end();
//     }

//     res.setHeader('ETag', etag);
//     return res.json(announcements);
//   }
// }


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
