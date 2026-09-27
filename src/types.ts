export interface MovieItem {
  id: string;
  title: string;
  year: number;
  genre: string[];
  director: string;
  runtime: number;
  rating: number;
  moodTag: string;
  oneLineReview: string;
  synopsis: string;
  recommendedSnack: string;
  snackReason: string;
  posterBg: string;
  quote: string;
  highlightScene: string;
  trailerSearchTerm: string;
  customPosterUrl?: string;
}
