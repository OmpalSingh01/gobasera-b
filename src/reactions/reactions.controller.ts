// import {
//   Controller,
//   Post,
//   Delete,
//   Param,
//   Body,
//   Headers,
//   ParseIntPipe,
//   BadRequestException,
// } from '@nestjs/common';
// import { ReactionsService, ReactionType } from './reactions.service'; // normal import
// import type { Reaction } from './reactions.service'; // ✅ type-only import

// @Controller('announcements/:id/reactions')
// export class ReactionsController {
//   constructor(private readonly reactionsService: ReactionsService) {}

//   @Post()
//   addReaction(
//     @Param('id', ParseIntPipe) id: number,
//     @Body() body: { type: ReactionType },
//     @Headers('x-user-id') userId: string,
//     @Headers('idempotency-key') idempotencyKey?: string,
//   ): Reaction {
//     if (!userId) throw new BadRequestException('x-user-id header is required');
//     if (!body.type) throw new BadRequestException('type is required');

//     return this.reactionsService.addReaction(
//       id,
//       userId,
//       body.type,
//       idempotencyKey,
//     );
//   }

//   @Delete()
//   removeReaction(
//     @Param('id', ParseIntPipe) id: number,
//     @Headers('x-user-id') userId: string,
//   ): { success: boolean } {
//     if (!userId) throw new BadRequestException('x-user-id header is required');

//     const success = this.reactionsService.removeReaction(id, userId);
//     return { success };
//   }
// }

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
