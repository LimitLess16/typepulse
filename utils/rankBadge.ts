export type Rank = "Beginner" | "Intermediate" | "Advanced" | "Expert";

export function calculateRank(wpm: number): Rank {
  if (wpm < 40) return "Beginner";
  if (wpm < 70) return "Intermediate";
  if (wpm < 100) return "Advanced";
  return "Expert";
}

export function evaluateBadges(wpm: number, accuracy: number): string[] {
  const badges: string[] = [];
  if (wpm >= 100) badges.push("Speed Demon");
  if (accuracy >= 98) badges.push("Sharpshooter");
  if (wpm >= 80 && accuracy >= 95) badges.push("Pro Typist");
  return badges;
}
