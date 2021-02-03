export interface NotificationMessage {
  id: string;
  title: string;
  content: string;
  link?: string;
  userId: string;
  creator: {
    userId: string;
    avatarUrl: string;
    name: string;
    isSystem: boolean;
  };
  type: string;
  icon: string;
  createdAt: Date | string | number;
  updatedAt: Date | string | number;
  haveRead: boolean;
  mode: string;
  props?: Record<string, any>;
  badge?: number;
  appId?: string;
}
