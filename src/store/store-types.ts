export interface AuthDataProps {
  email: string;
  isLoggedIn: boolean;
  token: string;
  session_id: string;
}

export type FilterDataProps = {
  genres: { id: string; name: string; checked: boolean }[];
  pickedGenres: string;
  sortBy: string;
  releaseYear: { min: number; max: number; pickedRange: number[] };
  searchActive: boolean;
};

export type MovieDataProps = {
  query: string;
  movieList: { page: number; results: MovieProps[]; total_pages: number; total_results: number };
  favorites: { page: number; results: MovieProps[]; total_pages: number; total_results: number };
  page: number;
};

export type MovieProps = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export type ErrorData = {
  message: string;
  code: number | null;
  showError: boolean;
};
