import { useAuth } from "@/hooks/auth";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Home() {
  const router = useRouter();
  const [loginError, setLoginError] = useState(null);
  const { loading, loggedIn } = useAuth();

  const handleSubmit = (event) => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    setLoginError(null);
    handleLogin(email.value, password.value)
      .then(() => router.push("/protected-route"))
      .catch((err) => setLoginError(err.message));
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!loading && loggedIn) {
    router.push("/protected-route");
    return;
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" />

        <label htmlFor="password">Password</label>
        <input type="password" id="password" />

        <button type="submit">Login</button>
        {loginError && <div>{loginError}</div>}
      </form>
    </div>
  );
}

async function handleLogin(email, password) {
  const resp = await fetch("/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const data = await resp.json();
  if (data.success) {
    return;
  }

  throw new Error("Woring email or password. Please Check");
}
