import { getServerSession, Session } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/authOptions";

type CheckUserAuthOrThrowReturnType = {
  session: Session;
  userId: number;
};

export const checkUserAuthOrThrow =
  async (): Promise<CheckUserAuthOrThrowReturnType> => {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) throw new Error("User is not Signed In");

    // Convert the user ID to a number since its stored as string by Next-Auth.
    const userId = Number(session.user.id);

    return { session, userId };
  };
