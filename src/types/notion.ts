export type cursor = undefined | string;

export interface responseProps {
  results: unknown | null;
  cursor: cursor | null;
  error: null | {
    message: string;
  };
}