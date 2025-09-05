import { Injectable } from '@nestjs/common';

export type Announcement = {
  id: number;
  title: string;
  description?: string;
  status: 'active' | 'closed';
  createdAt: Date;
};

@Injectable()
export class AnnouncementsService {
  private announcements: Announcement[] = [];
  private counter = 1;

  create(title: string, description?: string): Announcement {
    const announcement: Announcement = {
      id: this.counter++,
      title,
      description,
      status: 'active',
      createdAt: new Date(),
    };
    this.announcements.push(announcement);
    return announcement;
  }

  findAll(): Announcement[] {
    return [...this.announcements].sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
    );
  }

  updateStatus(id: number, status: 'active' | 'closed'): Announcement | null {
    const announcement = this.announcements.find((a) => a.id === id);
    if (announcement) {
      announcement.status = status;
      return announcement;
    }
    return null;
  }
}
