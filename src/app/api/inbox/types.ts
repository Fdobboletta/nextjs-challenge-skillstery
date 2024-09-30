type InboxMessage = {
  id: number;
  createdAt: Date;
  senderId: number;
  recipientId: number;
  title: string;
  content: string;
  isDeleted: boolean;
};

export type GetInboxMessagesResponse = InboxMessage[];
