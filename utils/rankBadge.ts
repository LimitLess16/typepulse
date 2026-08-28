export type Rank = "Beginner" | "Intermediate" | "Advanced" | "Expert";

export function calculateRank(wpm: number): Rank {
  if (wpm < 40) return "Beginner";
  if (wpm < 70) return "Intermediate";
  if (wpm < 100) return "Advanced";
  return "Expert";
}

export function evaluateBadges(metrics: {
  wpm: number;
  accuracy: number;
  mistakes: number;
  totalCharacters: number;
}): string[] {
  const badges: string[] = [];
  if (metrics.wpm >= 100) badges.push("Speed Demon");
  if (metrics.accuracy >= 98) badges.push("Sharpshooter");
  if (metrics.wpm >= 80 && metrics.accuracy >= 95) badges.push("Pro Typist");
  if (metrics.mistakes === 0 && metrics.totalCharacters > 50) badges.push("Flawless");
  return badges;
}
