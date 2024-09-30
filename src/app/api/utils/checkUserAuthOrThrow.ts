import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export const checkUserAuthOrThrow = async () => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) throw new Error("User is not Signed In");
  return session;
};
