import { getSession } from "@auth/solid-start";
import { signIn } from "@auth/solid-start/client";
import { A, useRouteData } from "@solidjs/router";
import { createServerData$ } from "solid-start/server";
import { authOpts } from "./api/auth/[...solidauth]";

export function routeData() {
  return createServerData$(
    async (_, { request }) => {
      return await getSession(request, authOpts);
    },
    { key: () => ["auth_user"] }
  );
}

export default function Home() {
  const session = useRouteData<typeof routeData>();

  return (
    <main>
      <nav class="mx-auto container h-16 flex items-center">
        <div class="text-2xl">Matter</div>
      </nav>
      <section class="mx-auto container section flex flex-col justify-center">
        <h1 class="text-7xl font-extrabold tracking-tight">
          Stay on track with Matter
        </h1>
        {session() ? (
          <A
            href="/dashboard"
            class="text-lg py-4 px-8 w-max rounded-md mt-4 bg-indigo-700 decoration-none text-white"
          >
            Go to Dashboard
          </A>
        ) : (
          <button
            class="border-0 text-lg py-4 px-8 w-max rounded-md mt-4 bg-green-700 decoration-none text-white"
            onClick={() => signIn("github")}
          >
            Sign in
          </button>
        )}
      </section>
    </main>
  );
}
