export type PatchMessageResponse = {
  id: number;
  isDeleted: boolean;
};

export type GetMessageResponse = {
  id: number;
  title: string;
  content: string;
  sender: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
  };
};
