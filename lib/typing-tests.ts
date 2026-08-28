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

const USER_TEST_LIMIT = 100;
const CACHE_TTL_MS = 30_000;

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
};

type CachedTests = {
  expiresAt: number;
  promise: Promise<TypingTest[]>;
};

const userTestsCache = new Map<string, CachedTests>();
let leaderboardCache: CachedTests | undefined;

export async function getUserTypingTests(userId: string): Promise<TypingTest[]> {
  const cached = userTestsCache.get(userId);
  if (cached && cached.expiresAt > Date.now()) {
    return cached.promise;
  }

  const promise = getDocs(query(
    collection(db, "typingTests"),
    where("userId", "==", userId),
    orderBy("createdAt", "desc"),
    limit(USER_TEST_LIMIT),
  )).then((snapshot) => snapshot.docs.map((document) => ({
    id: document.id,
    ...(document.data() as Omit<TypingTest, "id">),
  })));

  userTestsCache.set(userId, { promise, expiresAt: Date.now() + CACHE_TTL_MS });
  void promise.catch(() => {
    if (userTestsCache.get(userId)?.promise === promise) {
      userTestsCache.delete(userId);
    }
  });
  return promise;
}

export async function saveTypingTest(test: SaveTypingTestInput): Promise<string> {
  const savedTest = await addDoc(collection(db, "typingTests"), {
    ...test,
    isPublic: true,
    createdAt: serverTimestamp(),
  });

  userTestsCache.delete(test.userId);
  return savedTest.id;
}

export async function getPublicLeaderboard(): Promise<TypingTest[]> {
  if (leaderboardCache && leaderboardCache.expiresAt > Date.now()) {
    return leaderboardCache.promise;
  }

  const promise = getDocs(query(
    collection(db, "typingTests"),
    where("isPublic", "==", true),
    orderBy("wpm", "desc"),
    limit(50),
  )).then((snapshot) => snapshot.docs.map((document) => ({
    id: document.id,
    ...(document.data() as Omit<TypingTest, "id">),
  })));

  leaderboardCache = { promise, expiresAt: Date.now() + CACHE_TTL_MS };
  void promise.catch(() => {
    if (leaderboardCache?.promise === promise) {
      leaderboardCache = undefined;
    }
  });
  return promise;
}

export function getTypingTestTime(test: Pick<TypingTest, "createdAt">): number {
  return test.createdAt?.toDate().getTime() ?? 0;
}
