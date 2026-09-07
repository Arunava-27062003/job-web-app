export type Stream = "SCIENCE" | "HUMANITIES";

export type Student = {
  id: string;
  name: string;
  className: string;
  stream: Stream;
  section: string;
  roll: string;
  xp: number;
  selectedCareerId: string | null;
  selectedCareer?: { id: string; name: string; icon: string; isCustom?: boolean } | null;
};

export type Career = {
  id: string;
  slug: string;
  name: string;
  stream: Stream;
  tagline: string;
  description: string;
  icon: string;
  order: number;
  completedLevels: number;
  totalLevels: number;
};

export type PathNode = {
  order: number;
  levelId: string;
  subject: string;
  title: string;
  description: string;
  kind: "SUBJECT" | "CAPSTONE" | "FINAL";
  passScore: number;
  baseXp: number;
  questionCount: number;
  status: "LOCKED" | "UNLOCKED" | "COMPLETED";
  bestScore: number;
  stars: number;
  attempts: number;
};

export type QuizQuestion = {
  id: string;
  text: string;
  options: string[];
  hint: string;
  difficulty: number;
};

export type SubmitResultItem = {
  questionId: string;
  text: string;
  options: string[];
  correctIndex: number;
  yourAnswer: number | null;
  isCorrect: boolean;
  explanation: string;
  hintUsed: boolean;
};

export type SubmitResponse = {
  score: number;
  passed: boolean;
  stars: number;
  correctCount: number;
  total: number;
  xpEarned: number;
  xpAwarded: number;
  totalXp: number;
  results: SubmitResultItem[];
  unlockedNext: { id: string; title: string } | null;
};
