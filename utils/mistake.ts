export function computeMistakeAnalysis(
  mistakeMap: Record<string, number>
): string[] {
  const mistakes: string[] = [];

  // Sort by most frequent mistakes
  const sortedMistakes = Object.entries(mistakeMap).sort((a, b) => b[1] - a[1]);

  for (const [key, count] of sortedMistakes) {
    mistakes.push(`'${key}' mistyped ${count} times`);
  }

  return mistakes.slice(0, 5); // Return top 5 mistakes
}
