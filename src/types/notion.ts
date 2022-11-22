export type cursor = undefined | string;

export interface responseProps {
  results: any | null;
  cursor: cursor | null;
  error: null | {
    message: string;
  };
}