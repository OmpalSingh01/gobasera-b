// import { Controller, Post, Get, Param, Body, Query, ParseIntPipe, BadRequestException } from '@nestjs/common';
// import { CommentsService } from './comments.service';
// import type { Comment } from './comments.service'; // ✅ type-only import

// @Controller('announcements/:id/comments')
// export class CommentsController {
//   constructor(private readonly commentsService: CommentsService) {}

//   @Post()
//   addComment(
//     @Param('id', ParseIntPipe) id: number,
//     @Body() body: { authorName: string; text: string },
//   ): Comment {
//     const { authorName, text } = body;
//     if (!authorName || !text) {
//       throw new BadRequestException('authorName and text are required');
//     }
//     return this.commentsService.addComment(id, authorName, text);
//   }

//   @Get()
//   getComments(
//     @Param('id', ParseIntPipe) id: number,
//     @Query('cursor') cursor?: string,
//     @Query('limit') limit?: string,
//   ): Comment[] {
//     return this.commentsService.getComments(
//       id,
//       cursor ? Number(cursor) : undefined,
//       limit ? Number(limit) : 10,
//     );
//   }
// }


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
