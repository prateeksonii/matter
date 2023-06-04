import { getSession } from "@auth/solid-start";
import { signOut } from "@auth/solid-start/client";
import { Ref, Show, createEffect } from "solid-js";
import { useRouteData } from "solid-start";
import {
  createServerAction$,
  createServerData$,
  redirect,
} from "solid-start/server";
import prisma from "~/services/db";
import { authOpts } from "./api/auth/[...solidauth]";

export function routeData() {
  return createServerData$(
    async (_, { request }) => {
      const session = await getSession(request, authOpts);
      const user = await prisma.user.findUnique({
        where: {
          email: session?.user?.email ?? "",
        },
        include: {
          projects: true,
        },
      });

      if (!user) throw redirect("/");

      return { userId: user.id, projects: user.projects };
    },
    { key: () => ["user_projects"] }
  );
}

export default function DashboardPage() {
  let dialogRef: Ref<HTMLDialogElement> | undefined;

  const data = useRouteData<typeof routeData>();

  const [enrolling, { Form }] = createServerAction$(
    async (form: FormData, { request }) => {
      const name = form.get("name") as string;
      const description = form.get("description") as string;
      const userId = form.get("userId") as string;

      const errors: string[] = [];

      if (!name) {
        errors.push("Name is required");
      }

      if (!description) {
        errors.push("Description is required");
      }

      if (errors.length > 0) {
        throw new Error(JSON.stringify(errors));
      }

      await prisma.project.create({
        data: {
          name,
          description,
          slug: name.toLocaleLowerCase().split(" ").join("-"),
          userId,
        },
      });

      return redirect("/dashboard");
    }
  );

  createEffect(() => dialogRef?.close());

  return (
    <div>
      <nav class="h-16 justify-between items-center flex px-16">
        <div>Matter</div>
        <button
          class="border-none bg-zinc-700 text-white px-4 py-2 rounded-md"
          onClick={() => signOut()}
        >
          Sign out
        </button>
      </nav>
      <main class="px-16 h-[calc(100vh-4rem)] flex flex-col items-center justify-center">
        <Show when={data.loading}>Loading projects</Show>
        {data()?.projects.length > 0 ? (
          <div>cool</div>
        ) : (
          <button onClick={() => (dialogRef as any).showModal()} class="btn">
            Create a project
          </button>
        )}
      </main>
      <dialog
        ref={dialogRef}
        class="top-1/2 left-1/2 -translate-1/2 bg-zinc-950 text-white shadow border-none w-400px p-8 rd-md"
      >
        <h1 class="text-2xl">Let&apos;s set up a new project</h1>
        <Form class="mt-4 flex flex-col gap-4">
          <input placeholder="Name" type="text" name="name" class="input" />
          <textarea
            name="description"
            placeholder="Description (optional)"
            class="input"
            rows={8}
          ></textarea>
          <input type="hidden" name="userId" value={data()?.userId} />
          <Show when={enrolling?.error?.message}>{enrolling.error}</Show>
          <button type="submit" class="btn" disabled={enrolling.pending}>
            Create
          </button>
        </Form>
      </dialog>
    </div>
  );
}
