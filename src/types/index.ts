export type Game = {
  id: string;
  title: string;
  platform?: string;
  [key: string]: unknown;
};
