import { json, Link, LoaderFunction, Outlet } from "remix";
import { authenticator } from "~/utils/auth.server";
import { db } from "~/utils/db.server";

const Dashboard = () => {
  return (
    <div className="px-[10vw]">
      <nav className="flex h-16 items-center">
        <div className="text-2xl font-semibold">Matter</div>
        <Link
          className="ml-8 bg-primary text-light py-2 px-4 rounded font-medium"
          to="./create-project"
        >
          Create Project
        </Link>
      </nav>
      <Outlet />
    </div>
  );
};

export default Dashboard;

export const loader: LoaderFunction = async ({ request }) => {
  await authenticator.isAuthenticated(request, {
    failureRedirect: "/",
  });

  return null;
};
