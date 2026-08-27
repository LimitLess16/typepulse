"use client";

import { FormEvent, useState } from "react";
import {
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import app from "@/lib/firebase";

const auth = getAuth(app);

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      window.location.href = "/";
    } catch {
      setMessage(
        "Invalid email or password."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
        <a
          href="/"
          className="text-xl font-bold"
        >
          Type<span className="text-blue-600">Pulse</span>
        </a>

        <h1 className="mt-8 text-3xl font-bold">
          Welcome Back
        </h1>

        <p className="mt-2 text-gray-600">
          Login to continue your typing journey.
        </p>

        <form
          onSubmit={handleLogin}
          className="mt-6 space-y-4"
        >
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(event) =>
              setEmail(event.target.value)
            }
            required
            className="w-full rounded-xl border border-gray-300 p-3 outline-none transition focus:border-blue-500"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) =>
              setPassword(event.target.value)
            }
            required
            className="w-full rounded-xl border border-gray-300 p-3 outline-none transition focus:border-blue-500"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {message && (
          <p className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-600">
            {message}
          </p>
        )}

        <p className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <a
            href="/register"
            className="font-semibold text-blue-600 hover:underline"
          >
            Create Account
          </a>
        </p>
      </div>
    </main>
  );
}