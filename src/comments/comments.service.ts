import { Injectable, BadRequestException } from '@nestjs/common';

export interface Comment {
  id: number;
  announcementId: number;
  authorName: string;
  text: string;
  createdAt: Date;
}

@Injectable()
export class CommentsService {
  private comments: Comment[] = [];
  private commentIdCounter = 1;

  addComment(announcementId: number, authorName: string, text: string): Comment {
    if (!authorName || !text) {
      throw new BadRequestException('authorName and text are required');
    }
    if (text.length < 1 || text.length > 500) {
      throw new BadRequestException('text must be 1–500 characters');
    }

    const comment: Comment = {
      id: this.commentIdCounter++,
      announcementId,
      authorName,
      text,
      createdAt: new Date(),
    };

    this.comments.push(comment);
    return comment;
  }

  getComments(announcementId: number, cursor?: number, limit = 10): Comment[] {
    const filtered = this.comments
      .filter((c) => c.announcementId === announcementId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()); // newest first

    let startIndex = 0;
    if (cursor) {
      const idx = filtered.findIndex((c) => c.id === cursor);
      if (idx >= 0) startIndex = idx + 1;
    }

    return filtered.slice(startIndex, startIndex + limit);
  }
}
