type Receiver = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
};

type SentMessage = {
  id: number;
  createdAt: Date;
  senderId: number;
  title: string;
  content: string;
  isDeleted: boolean;
  receiver: Receiver;
};

export type GetSentMessagesResponse = SentMessage[];
