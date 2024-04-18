export type OverviewTabProps = {
  overview: string;
  production_companies: { id: number; logo_path: string; name: string; origin_country: string }[];
  production_countries: { iso_3166_1: string; name: string }[];
  genres: { id: number; name: string }[];
  budget: number;
  revenue: number;
  runtime: number;
  release_date: string;
};

export type CrewTabProps = {
  id: number;
};

export type ActorsProps = {
  id: number;
};
