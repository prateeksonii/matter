import { Project } from "@prisma/client";
import { json, LoaderFunction, useLoaderData } from "remix";
import { authenticator } from "~/utils/auth.server";
import { db } from "~/utils/db.server";

const DashboardIndex = () => {
  const { projects }: { projects: Project[] } = useLoaderData();

  return (
    <div className="mt-8">
      <h2 className="text-2xl">Your projects</h2>
      <div className="mt-8 flex flex-wrap gap-4">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-dark2 h-40 min-w-[200px] flex items-center justify-center rounded cursor-pointer"
          >
            {project.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardIndex;

export const loader: LoaderFunction = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: "/",
  });

  const userInDb = await db.user.findFirst({
    where: { id: user.id },
    include: { projects: true },
  });

  return json({
    projects: userInDb?.projects,
  });
};
