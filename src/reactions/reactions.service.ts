// import { Injectable, BadRequestException } from '@nestjs/common';

// export type ReactionType = 'up' | 'down' | 'heart';

// export interface Reaction {
//   id: number;
//   announcementId: number;
//   userId: string;
//   type: ReactionType;
//   createdAt: Date;
//   idempotencyKey?: string;
// }

// @Injectable()
// export class ReactionsService {
//   private reactions: Reaction[] = [];
//   private reactionIdCounter = 1;

//   // Add reaction with idempotency support
//   addReaction(
//     announcementId: number,
//     userId: string,
//     type: ReactionType,
//     idempotencyKey?: string,
//   ): Reaction {
//     if (!userId) throw new BadRequestException('x-user-id header is required');
//     if (!['up', 'down', 'heart'].includes(type)) {
//       throw new BadRequestException('Invalid reaction type');
//     }

//     // Ignore duplicate with same idempotency key within 5 minutes
//     if (idempotencyKey) {
//       const existing = this.reactions.find(
//         (r) =>
//           r.idempotencyKey === idempotencyKey &&
//           r.announcementId === announcementId &&
//           r.userId === userId &&
//           Date.now() - r.createdAt.getTime() <= 5 * 60 * 1000,
//       );
//       if (existing) return existing;
//     }

//     // Check if user already reacted with same type (replace reaction)
//     const existingReaction = this.reactions.find(
//       (r) => r.announcementId === announcementId && r.userId === userId,
//     );
//     if (existingReaction) {
//       existingReaction.type = type;
//       existingReaction.idempotencyKey = idempotencyKey;
//       existingReaction.createdAt = new Date();
//       return existingReaction;
//     }

//     const reaction: Reaction = {
//       id: this.reactionIdCounter++,
//       announcementId,
//       userId,
//       type,
//       createdAt: new Date(),
//       idempotencyKey,
//     };

//     this.reactions.push(reaction);
//     return reaction;
//   }

//   // Remove reaction by user
//   removeReaction(announcementId: number, userId: string): boolean {
//     const index = this.reactions.findIndex(
//       (r) => r.announcementId === announcementId && r.userId === userId,
//     );
//     if (index === -1) return false;
//     this.reactions.splice(index, 1);
//     return true;
//   }

//   // Optional: list reactions for announcement
//   getReactions(announcementId: number): Reaction[] {
//     return this.reactions.filter((r) => r.announcementId === announcementId);
//   }
// }

import { Injectable, BadRequestException } from '@nestjs/common';
import { AnnouncementsService, Announcement } from '../announcements/announcements.service';

export type ReactionType = 'up' | 'down' | 'heart';

@Injectable()
export class ReactionsService {
  constructor(private announcementsService: AnnouncementsService) {}

  addReaction(
    announcementId: number,
    userId: string,
    type: ReactionType,
  ): Record<ReactionType, number> {
    if (!userId) throw new BadRequestException('x-user-id header is required');
    if (!['up', 'down', 'heart'].includes(type)) {
      throw new BadRequestException('Invalid reaction type');
    }

    const announcement = this.announcementsService.findById(announcementId);

    if (!announcement.reactions) announcement.reactions = { up: 0, down: 0, heart: 0 };

    announcement.reactions[type] = (announcement.reactions[type] || 0) + 1;

    this.announcementsService.update(announcementId, { reactions: announcement.reactions });

    return announcement.reactions;
  }

  getReactions(announcementId: number): Record<ReactionType, number> {
    const announcement = this.announcementsService.findById(announcementId);
    return announcement.reactions || { up: 0, down: 0, heart: 0 };
  }
}
