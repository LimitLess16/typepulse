"use client";

import { FormEvent, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";

type AuthFormProps = {
  mode: "login" | "register";
};

export default function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (mode === "register") {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      router.push("/dashboard");
    } catch (caughtError) {
      setError(getAuthErrorMessage(caughtError, mode));
    } finally {
      setLoading(false);
    }

    function getAuthErrorMessage(error: unknown, mode: AuthFormProps["mode"]): string {
      if (!(error instanceof FirebaseError)) {
        return "Something went wrong. Please try again.";
      }

      switch (error.code) {
        case "auth/email-already-in-use":
          return "An account with this email already exists. Try logging in instead.";
        case "auth/invalid-email":
          return "Enter a valid email address.";
        case "auth/weak-password":
          return "Choose a stronger password with at least 6 characters.";
        case "auth/invalid-credential":
        case "auth/wrong-password":
        case "auth/user-not-found":
          return "The email or password is incorrect.";
        case "auth/operation-not-allowed":
          return "Email/password sign-in is disabled in Firebase. Enable it in Authentication > Sign-in method.";
        case "auth/invalid-api-key":
        case "auth/api-key-not-valid":
          return "Firebase is not configured correctly. Check the values in .env.local and restart the dev server.";
        case "auth/network-request-failed":
          return "Network error. Check your internet connection and try again.";
        default:
          return mode === "register"
            ? "We could not create your account. Check your Firebase settings and try again."
            : "We could not log you in. Check your Firebase settings and try again.";
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <label className="block text-sm font-medium text-slate-700">
        Email
        <input
          id="email"
          name="email"
          required
          type="email"
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
        />
      </label>
      <label className="block text-sm font-medium text-slate-700">
        Password
        <input
          id="password"
          name="password"
          required
          minLength={6}
          type="password"
          autoComplete={mode === "login" ? "current-password" : "new-password"}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
        />
      </label>
      {error && <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}
      <button
        disabled={loading}
        className="w-full rounded-xl bg-indigo-600 px-4 py-3 font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Please wait..." : mode === "login" ? "Log in" : "Create account"}
      </button>
    </form>
  );
}
