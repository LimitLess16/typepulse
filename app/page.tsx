export default function Home() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* Navigation */}
      <nav className="border-b border-gray-200">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="text-2xl font-bold tracking-tight">
            Type<span className="text-blue-600">Pulse</span>
          </div>

          <div className="hidden gap-8 text-sm font-medium md:flex">
            <a href="#tests" className="hover:text-blue-600">
              Tests
            </a>
            <a href="#practice" className="hover:text-blue-600">
              Practice
            </a>
            <a href="#features" className="hover:text-blue-600">
              Features
            </a>
            <a href="#faq" className="hover:text-blue-600">
              FAQ
            </a>
          </div>

          <a
  href="/typing-test"
  className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
>
  Start Test
</a>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-gradient-to-b from-blue-50 to-white">
        <div className="mx-auto max-w-7xl px-6 py-20 text-center md:py-28">
          <div className="mb-6 inline-flex rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700">
            Free Online Typing Test
          </div>

          <h1 className="mx-auto max-w-4xl text-4xl font-bold tracking-tight md:text-6xl">
            Test Your Typing Speed and{" "}
            <span className="text-blue-600">Improve Faster</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
            Measure your WPM, accuracy and typing errors with a fast,
            simple and completely free online typing test.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
             <a
  href="/typing-test"
  className="rounded-xl bg-blue-600 px-8 py-4 text-center font-semibold text-white shadow-lg hover:bg-blue-700"
>
  Start Typing Test
</a>

            <a
              href="#tests"
              className="rounded-xl border border-gray-300 bg-white px-8 py-4 font-semibold hover:bg-gray-50"
            >
              Explore Tests
            </a>
          </div>

          <div className="mx-auto mt-12 grid max-w-2xl grid-cols-3 gap-4">
            <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <p className="text-2xl font-bold">WPM</p>
              <p className="mt-1 text-sm text-gray-500">Speed Tracking</p>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <p className="text-2xl font-bold">%</p>
              <p className="mt-1 text-sm text-gray-500">Accuracy</p>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <p className="text-2xl font-bold">Free</p>
              <p className="mt-1 text-sm text-gray-500">Always Free</p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Tests */}
      <section id="tests" className="mx-auto max-w-7xl px-6 py-20">
        <div className="text-center">
          <p className="font-semibold text-blue-600">POPULAR TESTS</p>
          <h2 className="mt-2 text-3xl font-bold md:text-4xl">
            Choose Your Typing Test
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-gray-600">
            Start with a quick test or challenge yourself with a longer
            typing session.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[
            ["1 Minute", "Quick typing speed test"],
            ["2 Minutes", "Balanced speed challenge"],
            ["5 Minutes", "Long typing endurance test"],
            ["Typing Speed", "Measure your overall WPM"],
          ].map(([title, description]) => (
            <div
              key={title}
              className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 font-bold text-blue-600">
                ⌨
              </div>

              <h3 className="text-xl font-bold">{title} Test</h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                {description}
              </p>

              <button className="mt-6 font-semibold text-blue-600 hover:text-blue-700">
                Start Test →
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="text-center">
            <p className="font-semibold text-blue-600">WHY TYPEPULSE?</p>

            <h2 className="mt-2 text-3xl font-bold md:text-4xl">
              Everything You Need to Type Better
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              ["Accurate WPM", "Get instant words-per-minute results."],
              ["Live Accuracy", "Track mistakes while you type."],
              ["Progress Tracking", "See your typing improvement over time."],
              ["Free Practice", "Practice as much as you want."],
            ].map(([title, description]) => (
              <div key={title} className="rounded-2xl bg-white p-6 shadow-sm">
                <h3 className="text-lg font-bold">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-gray-600">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Practice */}
      <section id="practice" className="mx-auto max-w-7xl px-6 py-20">
        <div className="rounded-3xl bg-blue-600 px-8 py-14 text-center text-white md:px-16">
          <h2 className="text-3xl font-bold md:text-4xl">
            Practice. Improve. Type Faster.
          </h2>

          <p className="mx-auto mt-4 max-w-2xl leading-7 text-blue-100">
            Build your typing speed through regular practice and track your
            progress with useful statistics.
          </p>

          <button className="mt-8 rounded-xl bg-white px-8 py-4 font-semibold text-blue-600 hover:bg-gray-100">
            Start Practicing
          </button>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="bg-gray-50">
        <div className="mx-auto max-w-4xl px-6 py-20">
          <div className="text-center">
            <p className="font-semibold text-blue-600">FAQ</p>

            <h2 className="mt-2 text-3xl font-bold">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="mt-10 space-y-4">
            {[
              [
                "What is WPM?",
                "WPM means words per minute. It is a standard measurement used to estimate typing speed.",
              ],
              [
                "How is typing speed calculated?",
                "Typing speed is generally calculated using the number of characters typed divided by five and then adjusted for the time taken.",
              ],
              [
                "Is TypePulse free?",
                "Yes. The core typing tests and practice features are planned to be free for users.",
              ],
              [
                "Can I improve my typing speed?",
                "Yes. Regular practice, accuracy-focused training and learning touch typing can help improve speed over time.",
              ],
            ].map(([question, answer]) => (
              <details
                key={question}
                className="rounded-xl border border-gray-200 bg-white p-5"
              >
                <summary className="cursor-pointer font-semibold">
                  {question}
                </summary>

                <p className="mt-3 leading-7 text-gray-600">{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-8 text-sm text-gray-500 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} TypePulse. All rights reserved.
          </p>

          <div className="flex gap-6">
            <a href="#" className="hover:text-gray-900">
              Privacy
            </a>
            <a href="#" className="hover:text-gray-900">
              Terms
            </a>
            <a href="#" className="hover:text-gray-900">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}