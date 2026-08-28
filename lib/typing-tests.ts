import {
  addDoc,
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { db } from "./firebase";

export type TypingTest = {
  id: string;
  userId?: string;
  wpm: number;
  accuracy: number;
  duration?: number;
  mistakes?: number;
  totalCharacters?: number;
  correctCharacters?: number;
  isPublic?: boolean;
  createdAt?: { toDate: () => Date };
};

export type SaveTypingTestInput = {
  userId: string;
  wpm: number;
  accuracy: number;
  duration: number;
  mistakes: number;
  totalCharacters: number;
  correctCharacters: number;
  backspaceCount: number;
  deleteCount: number;
  spacebarCount: number;
  averageWpm: number;
  peakWpm: number;
  timeUsedSec: number;
  timeRemainingSec: number;
  rank: string;
  badges: string[];
  mistakeAnalysis: Record<string, number>;
};

export async function getUserTypingTests(userId: string): Promise<TypingTest[]> {
  const testsQuery = query(
    collection(db, "typingTests"),
    where("userId", "==", userId),
  );
  const snapshot = await getDocs(testsQuery);

  return snapshot.docs.map((document) => ({
    id: document.id,
    ...(document.data() as Omit<TypingTest, "id">),
  })).sort((first, second) => getTypingTestTime(second) - getTypingTestTime(first));
}

export async function saveTypingTest(test: SaveTypingTestInput): Promise<string> {
  const savedTest = await addDoc(collection(db, "typingTests"), {
    ...test,
    isPublic: true,
    createdAt: serverTimestamp(),
  });

  return savedTest.id;
}

export async function getPublicLeaderboard(): Promise<TypingTest[]> {
  const leaderboardQuery = query(
    collection(db, "typingTests"),
    where("isPublic", "==", true),
    orderBy("wpm", "desc"),
    limit(50),
  );
  const snapshot = await getDocs(leaderboardQuery);

  return snapshot.docs.map((document) => ({
    id: document.id,
    ...(document.data() as Omit<TypingTest, "id">),
  }));
}

export function getTypingTestTime(test: Pick<TypingTest, "createdAt">): number {
  return test.createdAt?.toDate().getTime() ?? 0;
}
