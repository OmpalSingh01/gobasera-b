// import { Injectable } from '@nestjs/common';
// import { CommentsService } from '../comments/comments.service';
// import { ReactionsService } from '../reactions/reactions.service';

// export interface Announcement {
//   id: number;
//   title: string;
//   description?: string;
//   status: 'active' | 'closed';
//   createdAt: Date;
// }

// @Injectable()
// export class AnnouncementsService {
//   private announcements: Announcement[] = [];
//   private announcementIdCounter = 1;

//   constructor(
//     private readonly commentsService: CommentsService,
//     private readonly reactionsService: ReactionsService,
//   ) {}

//   // Create a new announcement
//   create(title: string, description?: string): Announcement {
//     const announcement: Announcement = {
//       id: this.announcementIdCounter++,
//       title,
//       description,
//       status: 'active',
//       createdAt: new Date(),
//     };
//     this.announcements.push(announcement);
//     return announcement;
//   }

//   // Get all announcements with commentCount, reactions, lastActivityAt
//   getAll(): (Announcement & {
//     commentCount: number;
//     reactions: { up: number; down: number; heart: number };
//     lastActivityAt: Date;
//   })[] {
//     return this.announcements
//       .map((a) => {
//         const comments = this.commentsService.getComments(a.id);
//         const reactions = this.reactionsService.getReactions(a.id);

//         // Reactions breakdown
//         const reactionCounts = { up: 0, down: 0, heart: 0 };
//         reactions.forEach((r) => reactionCounts[r.type]++);

//         // Last comment timestamp
//         const lastCommentAt = comments.length
//           ? comments.reduce(
//               (prev, curr) => (curr.createdAt > prev ? curr.createdAt : prev),
//               comments[0].createdAt,
//             )
//           : null;

//         // Last reaction timestamp
//         const lastReactionAt = reactions.length
//           ? reactions.reduce(
//               (prev, curr) => (curr.createdAt > prev ? curr.createdAt : prev),
//               reactions[0].createdAt,
//             )
//           : null;

//         // Determine last activity
//         const lastActivityAt =
//           lastCommentAt && lastReactionAt
//             ? lastCommentAt > lastReactionAt
//               ? lastCommentAt
//               : lastReactionAt
//             : lastCommentAt || lastReactionAt || a.createdAt;

//         return {
//           ...a,
//           commentCount: comments.length,
//           reactions: reactionCounts,
//           lastActivityAt,
//         };
//       })
//       .sort(
//         (a, b) => b.lastActivityAt.getTime() - a.lastActivityAt.getTime(),
//       ); // newest activity first
//   }

//   // Update announcement status
//   updateStatus(id: number, status: 'active' | 'closed'): Announcement | null {
//     const announcement = this.announcements.find((a) => a.id === id);
//     if (!announcement) return null;
//     announcement.status = status;
//     return announcement;
//   }
// }


import { Injectable } from '@nestjs/common';

export interface Announcement {
  id: number;
  title: string;
  description?: string;
  status: 'active' | 'closed';
  createdAt: Date;
  closedAt?: Date;
  comments: Comment[];
  reactions: Reaction[];
}

export interface Comment {
  id: number;
  authorName: string;
  text: string;
  createdAt: Date;
}

export interface Reaction {
  userId: string;
  type: 'up' | 'down' | 'heart';
  createdAt: Date;
}

@Injectable()
export class AnnouncementsService {
  private announcements: Announcement[] = [];
  private nextId = 1;

  create(title: string, description?: string) {
    const newAnn: Announcement = {
      id: this.nextId++,
      title,
      description,
      status: 'active',
      createdAt: new Date(),
      comments: [],
      reactions: [],
    };
    this.announcements.unshift(newAnn);
    return newAnn;
  }

  findAll() {
    return this.announcements.map(a => ({
      ...a,
      commentCount: a.comments.length,
      reactionsBreakdown: a.reactions.reduce(
        (acc, r) => {
          acc[r.type] = (acc[r.type] || 0) + 1;
          return acc;
        },
        {} as Record<string, number>,
      ),
      lastActivityAt: a.comments.length
        ? a.comments[a.comments.length - 1].createdAt
        : a.reactions.length
        ? a.reactions[a.reactions.length - 1].createdAt
        : a.createdAt,
    }));
  }

  updateStatus(id: number, status: 'active' | 'closed') {
    const ann = this.announcements.find(a => a.id === id);
    if (!ann) return null;
    ann.status = status;
    if (status === 'closed') ann.closedAt = new Date();
    return ann;
  }

  addComment(announcementId: number, authorName: string, text: string) {
    const ann = this.announcements.find(a => a.id === announcementId);
    if (!ann) return null;
    const comment: Comment = {
      id: ann.comments.length + 1,
      authorName,
      text,
      createdAt: new Date(),
    };
    ann.comments.push(comment);
    return comment;
  }

  addReaction(announcementId: number, userId: string, type: 'up' | 'down' | 'heart') {
    const ann = this.announcements.find(a => a.id === announcementId);
    if (!ann) return null;
    // Idempotent: ignore duplicates
    const exists = ann.reactions.find(r => r.userId === userId && r.type === type);
    if (exists) return exists;
    const reaction: Reaction = { userId, type, createdAt: new Date() };
    ann.reactions.push(reaction);
    return reaction;
  }

  removeReaction(announcementId: number, userId: string) {
    const ann = this.announcements.find(a => a.id === announcementId);
    if (!ann) return null;
    ann.reactions = ann.reactions.filter(r => r.userId !== userId);
    return true;
  }
}
