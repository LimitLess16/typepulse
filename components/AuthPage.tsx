import Link from "next/link";
import AuthForm from "@/app/auth-form";

type AuthPageProps = {
  mode: "login" | "register";
};

const authPageContent = {
  login: {
    title: "Welcome back",
    description: "Log in to see your typing progress.",
    prompt: "New to TypePulse?",
    linkLabel: "Create an account",
    linkHref: "/register",
  },
  register: {
    title: "Create your account",
    description: "Start tracking every typing session.",
    prompt: "Already have an account?",
    linkLabel: "Log in",
    linkHref: "/login",
  },
} as const;

export default function AuthPage({ mode }: AuthPageProps) {
  const content = authPageContent[mode];

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6 py-12">
      <section className="w-full max-w-md rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
        <Link href="/" className="text-xl font-bold text-indigo-600">
          TypePulse
        </Link>
        <h1 className="mt-8 text-3xl font-bold text-slate-900">{content.title}</h1>
        <p className="mt-2 text-slate-600">{content.description}</p>
        <div className="mt-8">
          <AuthForm mode={mode} />
        </div>
        <p className="mt-6 text-center text-sm text-slate-600">
          {content.prompt}{" "}
          <Link href={content.linkHref} className="font-semibold text-indigo-600">
            {content.linkLabel}
          </Link>
        </p>
      </section>
    </main>
  );
}
