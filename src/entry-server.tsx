import { getSession } from "@auth/solid-start";
import {
  createHandler,
  renderAsync,
  StartServer,
} from "solid-start/entry-server";
import { authOpts } from "./routes/api/auth/[...solidauth]";
import { redirect } from "solid-start";

const protectedPaths = ["/dashboard"];

export default createHandler(
  ({ forward }) => {
    return async (event) => {
      if (protectedPaths.includes(new URL(event.request.url).pathname)) {
        const session = await getSession(event.request, authOpts);
        if (!session) {
          return redirect("/"); // a page for a non logged in user
        }
      }
      return forward(event); // if we got here, and the pathname is inside the `protectedPaths` array - a user is logged in
    };
  },
  renderAsync((event) => <StartServer event={event} />)
);
