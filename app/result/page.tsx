"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

export default function ResultPage() {
  return (
    <Suspense fallback={<main className="flex min-h-screen items-center justify-center text-gray-600">Loading results...</main>}>
      <ResultPageContent />
    </Suspense>
  );
}

function ResultPageContent() {
  const searchParams = useSearchParams();

  const wpm = searchParams.get("wpm") || "0";
  const accuracy = searchParams.get("accuracy") || "0";
  const errors = searchParams.get("errors") || "0";
  const characters = searchParams.get("characters") || "0";
  const correct = searchParams.get("correct") || "0";
  const duration = searchParams.get("duration") || "0";

  const incorrect = Math.max(
    Number(characters) - Number(correct),
    0
  );

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      <nav className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <Link href="/" className="text-xl font-bold">
            Type<span className="text-blue-600">Pulse</span>
          </Link>

          <Link
            href="/"
            className="text-sm font-medium text-gray-600 hover:text-blue-600"
          >
            Home
          </Link>
        </div>
      </nav>

      <section className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-16">
        <div className="text-center">
          <p className="font-semibold text-blue-600">TEST COMPLETE</p>

          <h1 className="mt-2 text-3xl font-bold sm:text-5xl">
            Your Typing Results
          </h1>

          <p className="mt-3 text-gray-600">
            Here is your performance summary.
          </p>
        </div>

        <div className="mt-10 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-10">
          <div className="text-center">
            <p className="text-sm font-medium text-gray-500">
              TYPING SPEED
            </p>

            <p className="mt-2 text-6xl font-bold text-blue-600">
              {wpm}
            </p>

            <p className="mt-1 text-gray-500">Words Per Minute</p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl bg-gray-50 p-5 text-center">
              <p className="text-sm text-gray-500">Accuracy</p>
              <p className="mt-2 text-2xl font-bold">{accuracy}%</p>
            </div>

            <div className="rounded-2xl bg-gray-50 p-5 text-center">
              <p className="text-sm text-gray-500">Errors</p>
              <p className="mt-2 text-2xl font-bold">{errors}</p>
            </div>

            <div className="rounded-2xl bg-gray-50 p-5 text-center">
              <p className="text-sm text-gray-500">Characters</p>
              <p className="mt-2 text-2xl font-bold">{characters}</p>
            </div>

            <div className="rounded-2xl bg-gray-50 p-5 text-center">
              <p className="text-sm text-gray-500">Duration</p>
              <p className="mt-2 text-2xl font-bold">{duration}s</p>
            </div>
          </div>

          <div className="mt-8 rounded-2xl border border-gray-200 p-5">
            <h2 className="text-lg font-bold">
              Character Breakdown
            </h2>

            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="rounded-xl bg-green-50 p-4">
                <p className="text-sm text-green-700">Correct</p>
                <p className="mt-1 text-2xl font-bold text-green-700">
                  {correct}
                </p>
              </div>

              <div className="rounded-xl bg-red-50 p-4">
                <p className="text-sm text-red-700">Incorrect</p>
                <p className="mt-1 text-2xl font-bold text-red-700">
                  {incorrect}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/typing-test"
              className="w-full rounded-xl bg-blue-600 px-6 py-4 text-center font-semibold text-white hover:bg-blue-700"
            >
              Try Again
            </Link>

            <Link
              href="/"
              className="w-full rounded-xl border border-gray-300 bg-white px-6 py-4 text-center font-semibold text-gray-700 hover:bg-gray-50"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}