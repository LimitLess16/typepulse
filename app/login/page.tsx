import Link from "next/link";
import AuthForm from "../auth-form";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6 py-12">
      <section className="w-full max-w-md rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
        <Link href="/" className="text-xl font-bold text-indigo-600">TypePulse</Link>
        <h1 className="mt-8 text-3xl font-bold text-slate-900">Welcome back</h1>
        <p className="mt-2 text-slate-600">Log in to see your typing progress.</p>
        <div className="mt-8"><AuthForm mode="login" /></div>
        <p className="mt-6 text-center text-sm text-slate-600">
          New to TypePulse? <Link href="/register" className="font-semibold text-indigo-600">Create an account</Link>
        </p>
      </section>
    </main>
  );
}
