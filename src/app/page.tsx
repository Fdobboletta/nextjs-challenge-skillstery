import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { routePaths } from "./routePaths";
import { authOptions } from "./api/auth/[...nextauth]/authOptions";

const Home = async () => {
  const session = await getServerSession(authOptions);
  const isLoggedIn = session && session.user;

  redirect(isLoggedIn ? routePaths.inbox : routePaths.login);
};

export default Home;
