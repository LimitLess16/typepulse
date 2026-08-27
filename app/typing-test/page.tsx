"use client";

import { useEffect, useMemo, useState } from "react";

const PASSAGES = [
  "The quick brown fox jumps over the lazy dog. Practice regularly to improve your typing speed accuracy and confidence.",
  "Typing is a skill that improves with regular practice. Focus on accuracy first and speed will naturally follow.",
  "Technology continues to change the way we work and communicate. Good typing skills can help you work faster and more efficiently.",
  "A consistent typing practice routine can improve your confidence, accuracy and overall productivity every day.",
  "Learning to type without looking at the keyboard can help you become faster and more comfortable when working on a computer.",
];

const DURATIONS = [30, 60, 120];

function getRandomPassage() {
  return PASSAGES[Math.floor(Math.random() * PASSAGES.length)];
}

export default function TypingTestPage() {
  const [duration, setDuration] = useState(60);
  const [timeLeft, setTimeLeft] = useState(60);

  const [started, setStarted] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [passage, setPassage] = useState(PASSAGES[0]);

  const correctChars = useMemo(() => {
    return [...typedText].reduce(
      (count, char, index) =>
        count + (char === passage[index] ? 1 : 0),
      0
    );
  }, [typedText, passage]);

  const errors = Math.max(
    typedText.length - correctChars,
    0
  );

  const elapsedSeconds = Math.max(
    duration - timeLeft,
    1
  );

  const elapsedMinutes = elapsedSeconds / 60;

  const accuracy =
    typedText.length > 0
      ? Math.round(
          (correctChars / typedText.length) * 100
        )
      : 100;

  const wpm =
    typedText.length > 0
      ? Math.round(
          correctChars / 5 / elapsedMinutes
        )
      : 0;

  useEffect(() => {
    if (!started) return;

    if (timeLeft <= 0) {
      finishTest();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((current) => current - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [started, timeLeft]);

  function startTest() {
    setPassage(getRandomPassage());
    setTypedText("");
    setTimeLeft(duration);
    setStarted(true);
  }

  function finishTest() {
    setStarted(false);

    const finalSeconds = Math.max(
      duration - timeLeft,
      1
    );

    const finalMinutes = finalSeconds / 60;

    const finalWpm = Math.round(
      correctChars / 5 / finalMinutes
    );

    const finalAccuracy =
      typedText.length > 0
        ? Math.round(
            (correctChars / typedText.length) * 100
          )
        : 100;

    const params = new URLSearchParams({
      wpm: String(finalWpm),
      accuracy: String(finalAccuracy),
      errors: String(errors),
      characters: String(typedText.length),
      correct: String(correctChars),
      duration: String(finalSeconds),
    });

    window.location.href = `/result?${params.toString()}`;
  }

  function changeDuration(value: number) {
    if (started) return;

    setDuration(value);
    setTimeLeft(value);
    setTypedText("");
  }

  function handleTyping(value: string) {
    if (!started) return;

    if (value.length <= passage.length) {
      setTypedText(value);

      if (value.length === passage.length) {
        setTimeout(finishTest, 100);
      }
    }
  }

  const displayText = [...passage].map(
    (char, index) => {
      let className = "text-gray-400";

      if (index === typedText.length && started) {
        className =
          "border-l-2 border-blue-600 text-gray-700";
      } else if (index < typedText.length) {
        className =
          typedText[index] === char
            ? "text-green-600"
            : "text-red-500";
      }

      return (
        <span
          key={`${index}-${char}`}
          className={className}
        >
          {char}
        </span>
      );
    }
  );

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      <nav className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <a
            href="/"
            className="text-xl font-bold"
          >
            Type<span className="text-blue-600">
              Pulse
            </span>
          </a>

          <a
            href="/"
            className="text-sm font-medium text-gray-600 hover:text-blue-600"
          >
            Home
          </a>
        </div>
      </nav>

      <section className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
        <div className="text-center">
          <p className="font-semibold text-blue-600">
            TYPING TEST
          </p>

          <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
            Free Online Typing Test
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-gray-600 sm:text-base">
            Practice typing and measure your speed,
            accuracy and errors in real time.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {DURATIONS.map((value) => (
            <button
              key={value}
              onClick={() =>
                changeDuration(value)
              }
              disabled={started}
              className={`rounded-xl px-5 py-3 text-sm font-semibold transition ${
                duration === value
                  ? "bg-blue-600 text-white"
                  : "border border-gray-300 bg-white text-gray-700 hover:border-blue-400"
              } ${
                started
                  ? "cursor-not-allowed opacity-60"
                  : ""
              }`}
            >
              {value} Seconds
            </button>
          ))}
        </div>

        <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-8">
          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-xl bg-gray-50 p-4 text-center">
              <p className="text-xs text-gray-500">
                TIME
              </p>

              <p className="mt-1 text-2xl font-bold">
                {timeLeft}s
              </p>
            </div>

            <div className="rounded-xl bg-gray-50 p-4 text-center">
              <p className="text-xs text-gray-500">
                WPM
              </p>

              <p className="mt-1 text-2xl font-bold">
                {wpm}
              </p>
            </div>

            <div className="rounded-xl bg-gray-50 p-4 text-center">
              <p className="text-xs text-gray-500">
                ACCURACY
              </p>

              <p className="mt-1 text-2xl font-bold">
                {accuracy}%
              </p>
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-gray-200 bg-gray-50 p-5 text-lg leading-8 sm:p-8 sm:text-xl">
            {displayText}
          </div>

          <textarea
            value={typedText}
            onChange={(e) =>
              handleTyping(e.target.value)
            }
            disabled={!started}
            autoFocus
            spellCheck={false}
            placeholder={
              started
                ? "Start typing here..."
                : "Click Start Test to begin..."
            }
            className="mt-6 min-h-[180px] w-full resize-none rounded-xl border border-gray-300 bg-white p-4 text-base outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-gray-100"
          />

          <div className="mt-4 flex flex-col gap-3 rounded-xl bg-gray-50 px-4 py-3 text-sm sm:flex-row sm:justify-between">
            <span>
              Errors:{" "}
              <strong>{errors}</strong>
            </span>

            <span>
              Characters:{" "}
              <strong>{typedText.length}</strong>
            </span>
          </div>

          <button
            onClick={startTest}
            disabled={started}
            className="mt-6 w-full rounded-xl bg-blue-600 px-6 py-4 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {started
              ? "Test Running..."
              : "Start Test"}
          </button>
        </div>
      </section>
    </main>
  );
}