import { DISTANCE_THRESHOLD } from "../config";

interface Score {
  value: string;
  score: number;
}

export const calculateScores = (target: string, arr: Card[]): Score[] => {
  const scores: Score[] = [];

  for (let i = 0; i < arr.length; i++) {
    const score = calculateScore(target?.toLowerCase(), arr[i].name);
    if (score > DISTANCE_THRESHOLD) {
      scores.push({
        value: arr[i].cardDefId,
        score: score,
      });
    }
  }

  return scores.sort((a, b) => b.score - a.score);
};

function calculateScore(str1: string, str2: string): number {
  const distance = levenshteinDistance(str1, str2);
  const maxLength = Math.max(str1.length, str2.length);
  const score = (maxLength - distance) / maxLength;

  return score;
}

function levenshteinDistance(str1: string, str2: string): number {
  const matrix: number[][] = [];

  for (let i = 0; i <= str1.length; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= str2.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= str1.length; i++) {
    for (let j = 1; j <= str2.length; j++) {
      if (str1.charAt(i - 1) === str2.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }

  return matrix[str1.length][str2.length];
}
