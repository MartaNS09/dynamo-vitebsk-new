export type NotificationType = 'new_application' | 'status_change' | 'new_comment' | 'system';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  link?: string;
  data?: {
    applicationId?: string;
    applicationName?: string;
    oldStatus?: string;
    newStatus?: string;
    comment?: string;
  };
}
