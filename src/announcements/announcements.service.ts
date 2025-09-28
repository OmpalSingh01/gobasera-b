

import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';

export interface Announcement {
  id: number;
  title: string;
  description: string;
  status: 'active' | 'closed';
  reactions: { up: number; down: number; heart: number };
  comments: { id: number; authorName: string; text: string; createdAt: Date }[];
  createdAt: Date;
  closedAt?: Date;
}

@Injectable()
export class AnnouncementsService {
  private announcements: Announcement[] = [];
  private idCounter = 1;
  private commentIdCounter = 1;

  /** Create new announcement */
  create(title?: string, description?: string): Announcement {
    if (!title || !description) {
      throw new BadRequestException('title and description are required');
    }

    const newAnnouncement: Announcement = {
      id: this.idCounter++,
      title,
      description,
      status: 'active',
      reactions: { up: 0, down: 0, heart: 0 },
      comments: [],
      createdAt: new Date(),
    };

    this.announcements.push(newAnnouncement);
    return newAnnouncement;
  }

    /** Get all announcements - newest first */
  findAll(): Announcement[] {
    return this.announcements.sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
    );
  }

  /** Find by ID */
  findById(id: number): Announcement {
    const announcement = this.announcements.find(a => a.id === id);
    if (!announcement) throw new NotFoundException('Announcement not found');
    return announcement;
  }

  /** Update announcement partially */
  update(id: number, updates: Partial<Announcement>): Announcement {
    const announcement = this.findById(id);
    Object.assign(announcement, updates);
    return announcement;
  }

  /** Update status (active / closed) */
  updateStatus(id: number, status: 'active' | 'closed'): Announcement {
    const announcement = this.findById(id);
    announcement.status = status;
    if (status === 'closed') announcement.closedAt = new Date();
    return announcement;
  }

  /** Add comment */
  addComment(id: number, authorName: string, text: string) {
    if (!authorName || !text) {
      throw new BadRequestException('authorName and text are required');
    }
    const announcement = this.findById(id);
    const newComment = {
      id: this.commentIdCounter++,
      authorName,
      text,
      createdAt: new Date(),
    };
    announcement.comments.push(newComment);
    return newComment;
  }

  /** Add reaction */
  addReaction(id: number, userId: string, type: 'up' | 'down' | 'heart') {
    if (!userId) throw new BadRequestException('x-user-id header is required');
    const announcement = this.findById(id);
    announcement.reactions[type] += 1;
    return announcement.reactions;
  }

  /** Remove reaction */
  removeReaction(id: number, userId: string) {
    if (!userId) throw new BadRequestException('x-user-id header is required');
    const announcement = this.findById(id);
    // For now: just reset reactions to simulate removal
    announcement.reactions = { up: 0, down: 0, heart: 0 };
    return announcement.reactions;
  }
}
