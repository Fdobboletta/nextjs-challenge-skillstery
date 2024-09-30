export type RegisterUserReqBody = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
};

export type RegisterUserResponse = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: Date;
};
