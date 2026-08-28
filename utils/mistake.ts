export function computeMistakeAnalysis(
  passage: string,
  typedText: string
): string[] {
  const mistakes: string[] = [];
  const mistypedChars: Record<string, number> = {};

  for (let i = 0; i < typedText.length; i++) {
    const expected = passage[i];
    const actual = typedText[i];
    if (expected !== actual) {
      const key = `'${expected}' typed as '${actual}'`;
      mistypedChars[key] = (mistypedChars[key] || 0) + 1;
    }
  }

  // Sort by most frequent mistakes
  const sortedMistakes = Object.entries(mistypedChars).sort((a, b) => b[1] - a[1]);

  for (const [key, count] of sortedMistakes) {
    mistakes.push(`${key} (${count} times)`);
  }

  return mistakes.slice(0, 5); // Return top 5 mistakes
}
