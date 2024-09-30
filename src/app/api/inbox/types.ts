type InboxMessage = {
  id: number;
  createdAt: Date;
  receiverId: number;
  title: string;
  content: string;
  isDeleted: boolean;
  sender: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
  };
};

export type GetInboxMessagesResponse = InboxMessage[];
