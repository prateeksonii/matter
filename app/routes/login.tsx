import { Form, LoaderFunction } from "remix";
import { authenticator } from "~/utils/auth.server";

export default function Login() {
  return (
    <Form action="/auth/auth0" method="post">
      <button>Login with Auth0</button>
    </Form>
  );
}

export const loader: LoaderFunction = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request, {
    successRedirect: "/dashboard",
  });

  return user;
};
