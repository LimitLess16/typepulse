"use client";

import Link from "next/link";
import { onAuthStateChanged, User } from "firebase/auth";
import { useEffect, useMemo, useState } from "react";
import { auth } from "@/lib/firebase";
import { saveTypingTest } from "@/lib/typing-tests";

const DURATIONS = [60, 120, 180] as const;
const PARAGRAPHS = [
  [
  "Great typing is built through patience, steady practice, and attention to detail. ",
  "Instead of rushing through every exercise, focus on making each keystroke accurate and deliberate. ",
  "As your hands become familiar with common letter patterns, your speed will improve naturally. ",
  "A calm rhythm also makes it easier to notice mistakes before they become habits. ",
  "Set aside a few minutes each day to practice sentences, short paragraphs, and unfamiliar words. ",
  "Try to keep your eyes on the screen, relax your shoulders, and let your fingers return to the home row. ",
  "With consistent effort, typing becomes less about searching for individual keys and more about expressing ideas clearly. ",
  "Progress may feel gradual at first, but small improvements add up when you return to practice regularly. ",
  "Use every test as a chance to learn something about your rhythm, accuracy, and concentration. ",
  "The goal is not only to type quickly, but to communicate comfortably and confidently whenever you use a keyboard. ",
  ],
  [
    "A clear mind and a comfortable rhythm can make a big difference during a typing session. ",
    "Keep your wrists relaxed, look at the words on the screen, and allow your fingers to move naturally. ",
    "Accuracy creates a strong foundation because every correctly typed word builds confidence for the next one. ",
    "When you practice often, difficult combinations become familiar and your hands begin to remember the right movement. ",
    "Celebrate small improvements, review your mistakes, and return tomorrow for another focused challenge. ",
  ],
  [
    "Good habits turn short practice sessions into lasting progress. ",
    "Begin at a pace that feels controlled, then gradually increase your speed while keeping your accuracy high. ",
    "Reading each sentence carefully helps you anticipate the next word and maintain a smooth flow. ",
    "There is no need to compare your early scores with anyone else because consistent personal progress is what matters most. ",
    "With time, the keyboard becomes a quiet tool that lets your ideas move from thought to screen without interruption. ",
  ],
];

type Duration = (typeof DURATIONS)[number];

function getPassage(duration: Duration): string {
  const paragraphs = [...PARAGRAPHS].sort(() => Math.random() - 0.5);
  const targetCharacters = Math.round(duration * 5);
  return paragraphs.flat().join("").slice(0, Math.max(300, targetCharacters));
}

function getInitialDuration(): Duration {
  if (typeof window === "undefined") return 60;
  const requestedDuration = Number(new URLSearchParams(window.location.search).get("duration"));
  return DURATIONS.includes(requestedDuration as Duration) ? requestedDuration as Duration : 60;
}

type TestResult = {
  wpm: number;
  accuracy: number;
  mistakes: number;
  duration: number;
  totalCharacters: number;
  correctCharacters: number;
};

function getMetrics(text: string, elapsedSeconds: number, passage: string): Omit<TestResult, "duration"> {
  let correctCharacters = 0;
  let mistakes = 0;

  for (let index = 0; index < text.length; index += 1) {
    if (text[index] === passage[index]) {
      correctCharacters += 1;
    } else {
      mistakes += 1;
    }
  }

  const minutes = Math.max(elapsedSeconds / 60, 1 / 60);
  return {
    wpm: Math.round((correctCharacters / 5 / minutes) * 10) / 10,
    accuracy: text.length ? Math.round((correctCharacters / text.length) * 1000) / 10 : 100,
    mistakes,
    totalCharacters: text.length,
    correctCharacters,
  };
}

export default function TypingTestClient() {
  const [duration, setDuration] = useState<Duration>(getInitialDuration);
  const [passage, setPassage] = useState(() => getPassage(getInitialDuration()));
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [typedText, setTypedText] = useState("");
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [now, setNow] = useState(Date.now());
  const [result, setResult] = useState<TestResult | null>(null);
  const [user, setUser] = useState<User | null>(auth.currentUser);
  const [saveState, setSaveState] = useState<"idle" | "saving" | "saved" | "error">("idle");

  useEffect(() => onAuthStateChanged(auth, setUser), []);

  useEffect(() => {
    if (startedAt === null || result) {
      return undefined;
    }

    const timer = window.setInterval(() => setNow(Date.now()), 250);
    return () => window.clearInterval(timer);
  }, [startedAt, result]);

  const elapsedSeconds = startedAt === null
    ? 0
    : Math.min(duration, Math.max(0, (now - startedAt) / 1000));
  const timeRemaining = Math.max(0, Math.ceil(duration - elapsedSeconds));
  const liveMetrics = useMemo(() => getMetrics(typedText, elapsedSeconds, passage), [typedText, elapsedSeconds, passage]);

  useEffect(() => {
    if (startedAt !== null && !result && elapsedSeconds >= duration) {
      finishTest();
    }
    // finishTest intentionally uses the current test state from this render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [elapsedSeconds, duration, startedAt, result]);

  function finishTest(text = typedText) {
    if (startedAt === null || result) {
      return;
    }

    const testResult: TestResult = {
      ...getMetrics(text, Math.max(0.1, Math.min(duration, (Date.now() - startedAt) / 1000)), passage),
      duration,
    };
    setResult(testResult);
    setSaveState(user ? "saving" : "idle");

    if (user) {
      void saveTypingTest({
        userId: user.uid,
        wpm: testResult.wpm,
        accuracy: testResult.accuracy,
        duration: testResult.duration,
        mistakes: testResult.mistakes,
        totalCharacters: testResult.totalCharacters,
        correctCharacters: testResult.correctCharacters,
      })
        .then(() => setSaveState("saved"))
        .catch(() => setSaveState("error"));
    }
  }

  function handleTextChange(value: string) {
    if (result || startedAt === null) {
      return;
    }
    const nextValue = value.slice(0, passage.length);
    setTypedText(nextValue);
    if (nextValue.length === passage.length) {
      finishTest(nextValue);
    }
  }

  function startTest() {
    const start = Date.now();
    setTypedText("");
    setResult(null);
    setSaveState("idle");
    setStartedAt(start);
    setNow(start);
  }

  function resetTest(nextDuration = duration) {
    setDuration(nextDuration);
    setPassage(getPassage(nextDuration));
    setTypedText("");
    setStartedAt(null);
    setResult(null);
    setSaveState("idle");
    setNow(Date.now());
  }

  function reloadParagraph() {
    setPassage(getPassage(duration));
    setTypedText("");
    setStartedAt(null);
    setResult(null);
    setSaveState("idle");
    setNow(Date.now());
  }

  return (
    <main className={theme === "dark" ? "min-h-screen bg-slate-950 text-slate-100" : "min-h-screen bg-slate-50 text-slate-900"}>
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link href="/" className="text-2xl font-bold text-indigo-500">TypePulse</Link>
        <div className="flex items-center gap-3">
          <button type="button" onClick={() => setTheme(theme === "light" ? "dark" : "light")} className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-600 hover:bg-white/10">
            {theme === "light" ? "Dark mode" : "Light mode"}
          </button>
          {user ? (
            <Link href="/dashboard" className="rounded-lg px-4 py-2 font-semibold text-slate-700 hover:bg-white">Dashboard</Link>
          ) : (
            <Link href="/login" className="rounded-lg px-4 py-2 font-semibold text-slate-700 hover:bg-white">Log in to save</Link>
          )}
        </div>
      </nav>

      <section className="mx-auto max-w-5xl px-6 pb-20 pt-10">
        <div className="text-center">
          <p className="font-semibold uppercase tracking-widest text-indigo-600">Typing speed test</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-900">Find your typing rhythm.</h1>
          <p className="mx-auto mt-4 max-w-2xl text-slate-600">Choose a duration, type the highlighted passage, and get an instant WPM and accuracy score.</p>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-2" aria-label="Test duration">
          {DURATIONS.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => resetTest(option)}
              className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
                duration === option ? "bg-indigo-600 text-white" : "bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-100"
              }`}
            >
              {option / 60} min
            </button>
          ))}
        </div>
        <div className="mt-4 text-center">
          <button type="button" onClick={reloadParagraph} className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-white/10">
            Reload paragraph
          </button>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-4">
          <Metric label="WPM" value={result ? result.wpm.toFixed(1) : liveMetrics.wpm.toFixed(1)} />
          <Metric label="Accuracy" value={`${(result ? result.accuracy : liveMetrics.accuracy).toFixed(1)}%`} />
          <Metric label="Mistakes" value={(result ? result.mistakes : liveMetrics.mistakes).toString()} />
          <Metric label="Time left" value={`${result ? 0 : timeRemaining}s`} />
        </div>

        {result ? (
          <div className="mt-8 rounded-2xl bg-white p-8 text-center shadow-sm ring-1 ring-slate-200">
            <p className="font-semibold uppercase tracking-widest text-indigo-600">Test complete</p>
            <h2 className="mt-3 text-3xl font-bold text-slate-900">{result.wpm.toFixed(1)} WPM</h2>
            <p className="mt-2 text-slate-600">{result.accuracy.toFixed(1)}% accuracy with {result.mistakes} mistakes.</p>
            {saveState === "saving" && <p className="mt-4 text-sm text-slate-500">Saving your result...</p>}
            {saveState === "saved" && <p className="mt-4 text-sm text-emerald-700">Result saved to your history.</p>}
            {saveState === "error" && <p className="mt-4 text-sm text-amber-700">We couldn&apos;t save this result, but your score is still available.</p>}
            {!user && <p className="mt-4 text-sm text-slate-500"><Link href="/login" className="font-semibold text-indigo-600 hover:underline">Log in</Link> to save this result and track your progress.</p>}
            <button type="button" onClick={() => resetTest()} className="mt-6 rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white hover:bg-indigo-700">Try again</button>
          </div>
        ) : (
          <div className="mt-8 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <div className={theme === "dark" ? "rounded-xl bg-slate-900 p-5 font-mono text-lg leading-8 tracking-wide text-slate-400" : "rounded-xl bg-white p-5 font-mono text-lg leading-8 tracking-wide text-slate-500"} aria-label="Passage to type">
              {Array.from(passage).map((character, index) => {
                const typedCharacter = typedText[index];
                const state = typedCharacter === undefined ? "text-slate-400" : typedCharacter === character ? "text-emerald-600" : "text-red-500 underline";
                return <span key={`${character}-${index}`} className={index === typedText.length ? "rounded bg-indigo-100 text-indigo-700" : state}>{character}</span>;
              })}
            </div>
            {startedAt === null && (
              <div className="mt-5 text-center">
                <button type="button" onClick={startTest} className="rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white hover:bg-indigo-700">
                  Start Test
                </button>
              </div>
            )}
            <label className="mt-5 block">
              <span className="sr-only">Type the passage above</span>
              <textarea
                value={typedText}
                onChange={(event) => handleTextChange(event.target.value)}
                onPaste={(event) => event.preventDefault()}
                disabled={result !== null || startedAt === null}
                autoFocus={startedAt !== null}
                rows={3}
                spellCheck={false}
                placeholder={startedAt === null ? "Click Start Test first..." : "Type the passage above..."}
                className={theme === "dark" ? "w-full resize-none rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 font-mono text-lg text-white outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900" : "w-full resize-none rounded-xl border border-slate-300 bg-white px-4 py-3 font-mono text-lg text-slate-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"}
              />
            </label>
            <p className="mt-3 text-center text-sm text-slate-500">
              {startedAt === null ? "Click Start Test when you are ready." : "The timer is running. Type the passage above."}
            </p>
          </div>
        )}
      </section>
    </main>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-white p-4 text-center shadow-sm ring-1 ring-slate-200">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-1 text-2xl font-bold text-slate-900">{value}</p>
    </div>
  );
}
