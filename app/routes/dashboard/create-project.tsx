import { User } from "@prisma/client";
import { ActionFunction, Form, json, redirect } from "remix";
import { authenticator } from "~/utils/auth.server";
import { db } from "~/utils/db.server";

export const action: ActionFunction = async ({ request }) => {
  const data = await request.formData();

  const name = data.get("name") as string;

  const user = (await authenticator.isAuthenticated(request)) as User;

  await db.project.create({
    data: {
      name,
      ownerId: user.id,
    },
  });

  return redirect("/dashboard");
};

export default function CreateProject() {
  return (
    <div className="my-8 flex flex-col items-center">
      <div>
        <h1 className="text-5xl">Create a new project</h1>
        <Form
          className="mt-8 text-lg flex flex-col gap-6"
          method="post"
          action="."
        >
          <div className="flex flex-col gap-1">
            <label htmlFor="name">Project Name</label>
            <input
              type="text"
              className="text-lg bg-dark2 p-2 rounded placeholder:text-gray-500"
              placeholder="My first project"
              name="name"
            />
          </div>
          <div className="flex flex-col gap-1">
            <button
              type="submit"
              className="bg-primary text-light px-4 py-2 rounded font-medium"
            >
              Create
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}
