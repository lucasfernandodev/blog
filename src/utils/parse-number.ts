export function parseNumber(value: string | undefined): number {
  if (value !== undefined && !isNaN(Number(value))) {
    return Number(value);
  }
  return 1;
}