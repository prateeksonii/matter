import { signOut } from "@auth/solid-start/client";

export default function DashboardPage() {
  return (
    <div>
      <button onClick={() => signOut()}>Sign out</button>
    </div>
  );
}
