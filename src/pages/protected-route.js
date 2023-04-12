import { useAuth } from "@/hooks/auth";
import { useRouter } from "next/router";

export default function ProtectedRoute() {
  const router = useRouter();
  const { loading, error, loggedIn } = useAuth();
  if (!loading && !loggedIn) {
    router.push("/login");
  }
  return (
    <div>
      {loading && <p>Loading</p>}
      {error && <p>An error occurred.</p>}
      {loggedIn && (
        <>
          <h1>Protected Route</h1>
          <p>You cant see me if not logged-in!</p>
        </>
      )}
    </div>
  );
}
