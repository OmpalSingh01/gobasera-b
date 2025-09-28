

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
