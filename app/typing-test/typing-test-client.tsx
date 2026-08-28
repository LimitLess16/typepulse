"use client";

import Link from "next/link";
import { onAuthStateChanged } from "firebase/auth";
import type { User } from "firebase/auth";
import { useEffect, useMemo, useRef, useState } from "react";
import { auth } from "@/lib/firebase";
import { saveTypingTest } from "@/lib/typing-tests";
import { paragraphs } from "@/data/paragraphs";
import { calculateRank, evaluateBadges } from "@/utils/rankBadge";
import type { Rank } from "@/utils/rankBadge";
import { computeMistakeAnalysis } from "@/utils/mistake";
import { ThemeToggle } from "@/components/ThemeToggle";

const DURATIONS = [60, 120, 180] as const;
type Difficulty = "easy" | "medium" | "hard" | "expert";
const DEFAULT_DIFFICULTY: Difficulty = "easy";

type Duration = (typeof DURATIONS)[number];

function getPassage(duration: Duration, difficulty: Difficulty = DEFAULT_DIFFICULTY, randomize = false): string {
  const filtered = paragraphs.filter(p => p.difficulty === difficulty);
  const source = randomize ? [...filtered].sort(() => Math.random() - 0.5) : filtered;
  const targetCharacters = Math.max(300, Math.round(duration * 5));
  let result = "";
  for (const p of source) {
    result += (result ? " " : "") + p.text;
    if (result.length >= targetCharacters) break;
  }
  return result;
}

function getInitialDuration(): Duration {
  if (typeof window === "undefined") return 60;
  const requestedDuration = Number(new URLSearchParams(window.location.search).get("duration"));
  return DURATIONS.includes(requestedDuration as Duration) ? requestedDuration as Duration : 60;
}

type LiveMetrics = {
  wpm: number;
  accuracy: number;
  mistakes: number;
  totalCharacters: number;
  correctCharacters: number;
};

type TestResult = LiveMetrics & {
  duration: number;
  averageWpm: number;
  peakWpm: number;
  timeUsedSec: number;
  timeRemainingSec: number;
  rank: Rank;
  badges: string[];
  mistakeAnalysis: string[];
};

function getMetrics(text: string, elapsedSeconds: number, passage: string): LiveMetrics {
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
  const [difficulty, setDifficulty] = useState<Difficulty>(DEFAULT_DIFFICULTY);
  const [passage, setPassage] = useState(() => getPassage(getInitialDuration(), DEFAULT_DIFFICULTY));
  const [typedText, setTypedText] = useState("");
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [now, setNow] = useState(Date.now());
  const [result, setResult] = useState<TestResult | null>(null);
  const [user, setUser] = useState<User | null>(auth.currentUser);
  const [saveState, setSaveState] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [backspaceCount, setBackspaceCount] = useState(0);
  const [deleteCount, setDeleteCount] = useState(0);
  const [spacebarCount, setSpacebarCount] = useState(0);
  const peakWpmRef = useRef(0);
  const [mistakeMap, setMistakeMap] = useState<Record<string, number>>({});

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
  const liveMetrics = useMemo(() => {
    return getMetrics(typedText, elapsedSeconds, passage);
  }, [typedText, elapsedSeconds, passage]);

  if (liveMetrics.wpm > peakWpmRef.current) {
    peakWpmRef.current = liveMetrics.wpm;
  }

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

    const metrics = getMetrics(text, Math.max(0.1, Math.min(duration, (Date.now() - startedAt) / 1000)), passage);
    const peakWpm = peakWpmRef.current || metrics.wpm;
    const avgWpm = ((metrics.wpm + peakWpm) / 2).toFixed(1);
    const rank = calculateRank(metrics.wpm);
    const badges = evaluateBadges({
      wpm: metrics.wpm,
      accuracy: metrics.accuracy,
      mistakes: metrics.mistakes,
      totalCharacters: metrics.totalCharacters,
    });
    const mistakeAnalysis = computeMistakeAnalysis(mistakeMap);
    const testResult: TestResult = {
      ...metrics,
      duration,
      averageWpm: Number(avgWpm),
      peakWpm,
      timeUsedSec: duration - timeRemaining,
      timeRemainingSec: timeRemaining,
      rank,
      badges,
      mistakeAnalysis,
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
        backspaceCount,
        deleteCount,
        spacebarCount,
        averageWpm: testResult.averageWpm,
        peakWpm: testResult.peakWpm,
        timeUsedSec: testResult.timeUsedSec,
        timeRemainingSec: testResult.timeRemainingSec,
        rank: testResult.rank,
        badges: testResult.badges,
        mistakeAnalysis: testResult.mistakeAnalysis,
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
    // update mistake map for characters that differ
    const newMistakes: Record<string, number> = {};
    for (let i = 0; i < nextValue.length; i++) {
      if (nextValue[i] !== passage[i]) {
        const char = passage[i];
        newMistakes[char] = (mistakeMap[char] || 0) + 1;
      }
    }
    setMistakeMap(prev => ({ ...prev, ...newMistakes }));
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
    setBackspaceCount(0);
    setDeleteCount(0);
    setSpacebarCount(0);
    peakWpmRef.current = 0;
    setMistakeMap({});
  }

  function resetTest(nextDuration = duration) {
    setDuration(nextDuration);
    setPassage(getPassage(nextDuration, difficulty));
    setTypedText("");
    setStartedAt(null);
    setResult(null);
    setSaveState("idle");
    setNow(Date.now());
    setBackspaceCount(0);
    setDeleteCount(0);
    setSpacebarCount(0);
    peakWpmRef.current = 0;
    setMistakeMap({});
  }

  function reloadParagraph() {
    setPassage(getPassage(duration, difficulty, true));
    setTypedText("");
    setStartedAt(null);
    setResult(null);
    setSaveState("idle");
    setNow(Date.now());
    setBackspaceCount(0);
    setDeleteCount(0);
    setSpacebarCount(0);
    peakWpmRef.current = 0;
    setMistakeMap({});
  }

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link href="/" className="text-2xl font-bold text-indigo-500">TypePulse</Link>
        <div className="flex items-center gap-3">
          <ThemeToggle />
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
        <div className="mt-2 flex items-center justify-center gap-2" aria-label="Difficulty selector">
          {(["easy","medium","hard","expert"] as Difficulty[]).map((level) => (
            <button
              key={level}
              type="button"
              onClick={() => { setDifficulty(level); resetTest(duration); }}
              className={`rounded px-3 py-1 text-xs font-medium ${
                difficulty === level ? "bg-indigo-700 text-white" : "bg-gray-200 text-gray-800"
              }`}
            >{level.charAt(0).toUpperCase() + level.slice(1)}</button>
          ))}
        </div>
        <div className="mt-4 text-center">
          <button type="button" onClick={reloadParagraph} className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-white/10">
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
          <div className="mt-8 rounded-2xl bg-white dark:bg-slate-900 p-8 text-center shadow-sm ring-1 ring-slate-200 dark:ring-slate-800">
            <p className="font-semibold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">Test complete</p>
            <h2 className="mt-3 text-4xl font-bold text-slate-900 dark:text-white">{result.wpm.toFixed(1)} WPM</h2>
            <p className="mt-2 text-slate-600 dark:text-slate-400 font-medium text-lg">{result.accuracy.toFixed(1)}% accuracy with {result.mistakes} mistakes.</p>

            <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left">
              <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-xl">
                <p className="text-sm text-slate-500 dark:text-slate-400">Rank</p>
                <p className="font-bold text-slate-900 dark:text-white">{result.rank}</p>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-xl">
                <p className="text-sm text-slate-500 dark:text-slate-400">Peak WPM</p>
                <p className="font-bold text-slate-900 dark:text-white">{result.peakWpm.toFixed(1)}</p>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-xl">
                <p className="text-sm text-slate-500 dark:text-slate-400">Backspace Count</p>
                <p className="font-bold text-slate-900 dark:text-white">{backspaceCount}</p>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-xl">
                <p className="text-sm text-slate-500 dark:text-slate-400">Time Used</p>
                <p className="font-bold text-slate-900 dark:text-white">{result.timeUsedSec}s</p>
              </div>
            </div>

            {result.badges.length > 0 && (
              <div className="mt-6 text-left">
                <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-2">Badges Earned</p>
                <div className="flex flex-wrap gap-2">
                  {result.badges.map(b => (
                    <span key={b} className="bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 px-3 py-1 rounded-full text-sm font-medium">🏆 {b}</span>
                  ))}
                </div>
              </div>
            )}

            {result.mistakeAnalysis.length > 0 && (
              <div className="mt-6 text-left">
                <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-2">Mistake Analysis</p>
                <ul className="list-disc pl-5 text-sm text-slate-700 dark:text-slate-300 space-y-1 font-mono">
                  {result.mistakeAnalysis.map((analysis, i) => (
                    <li key={i}>{analysis}</li>
                  ))}
                </ul>
              </div>
            )}
            {saveState === "saving" && <p className="mt-4 text-sm text-slate-500">Saving your result...</p>}
            {saveState === "saved" && <p className="mt-4 text-sm text-emerald-700">Result saved to your history.</p>}
            {saveState === "error" && <p className="mt-4 text-sm text-amber-700">We couldn&apos;t save this result, but your score is still available.</p>}
            {!user && <p className="mt-4 text-sm text-slate-500"><Link href="/login" className="font-semibold text-indigo-600 hover:underline">Log in</Link> to save this result and track your progress.</p>}
            <button type="button" onClick={() => resetTest()} className="mt-6 rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white hover:bg-indigo-700">Try again</button>
          </div>
        ) : (
          <div className="mt-8 rounded-2xl bg-white dark:bg-slate-900 p-6 shadow-sm ring-1 ring-slate-200 dark:ring-slate-800">
            <div className="rounded-xl bg-white dark:bg-slate-950 p-5 font-mono text-lg leading-8 tracking-wide text-slate-500 dark:text-slate-400" aria-label="Passage to type">
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
                onKeyDown={(e) => {
                  if (e.key === "Backspace") setBackspaceCount(c => c + 1);
                  else if (e.key === "Delete") setDeleteCount(c => c + 1);
                  else if (e.key === " ") setSpacebarCount(c => c + 1);
                }}
                onPaste={(event) => event.preventDefault()}
                disabled={result !== null || startedAt === null}
                autoFocus={startedAt !== null}
                rows={3}
                spellCheck={false}
                placeholder={startedAt === null ? "Click Start Test first..." : "Type the passage above..."}
                className="w-full resize-none rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3 font-mono text-lg text-slate-900 dark:text-white outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-900 transition-colors"
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
