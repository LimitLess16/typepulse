"use client";

import { FormEvent, useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
} from "firebase/auth";
import app from "@/lib/firebase";

const auth = getAuth(app);

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleRegister(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();
    setMessage("");

    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      setMessage("Account created successfully!");

      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      if (
        error instanceof Error &&
        error.message.includes("auth/email-already-in-use")
      ) {
        setMessage("This email is already registered.");
      } else {
        setMessage(
          "Could not create your account. Please check your details."
        );
      }
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
          Create Account
        </h1>

        <p className="mt-2 text-gray-600">
          Create your free TypePulse account.
        </p>

        <form
          onSubmit={handleRegister}
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
            minLength={6}
            required
            className="w-full rounded-xl border border-gray-300 p-3 outline-none transition focus:border-blue-500"
          />

          <input
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(event) =>
              setConfirmPassword(event.target.value)
            }
            minLength={6}
            required
            className="w-full rounded-xl border border-gray-300 p-3 outline-none transition focus:border-blue-500"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        {message && (
          <p className="mt-4 rounded-xl bg-gray-50 p-3 text-sm text-gray-700">
            {message}
          </p>
        )}

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <a
            href="/login"
            className="font-semibold text-blue-600 hover:underline"
          >
            Login
          </a>
        </p>
      </div>
    </main>
  );
}