export type CreateMessageReqBody = {
  receiverEmail: string;
  title: string;
  content: string;
};

export type CreateMessageResponse = {
  title: string;
  content: string;
  id: number;
  createdAt: Date;
  senderId: number;
  receiverId: number;
  isDeleted: boolean;
};
