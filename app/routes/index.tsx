import { Form } from "remix";

export default function Index() {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center">
      <h1 className="font-black text-6xl">Matter</h1>
      <p className="mt-2 text-2xl">An easy way to manage your projects</p>
      <Form action="/auth/auth0" method="post" className="mt-8">
        <button className="py-2 px-6 text-lg bg-primary rounded font-medium">
          Get Started
        </button>
      </Form>
    </div>
  );
}
