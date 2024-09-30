type SentMessage = {
  id: number;
  createdAt: Date;
  senderId: number;
  title: string;
  content: string;
  isDeleted: boolean;
  receiver: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
  };
};

export type GetSentMessagesResponse = SentMessage[];
