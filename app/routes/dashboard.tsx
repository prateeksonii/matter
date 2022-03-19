import { LoaderFunction } from "remix";
import { authenticator } from "~/utils/auth.server";

const Dashboard = () => {
  return <div>Dashboard</div>;
};

export default Dashboard;

export const loader: LoaderFunction = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });

  return user;
};
