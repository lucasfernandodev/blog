export interface IDomainPost {
  id: string;
  thumbnail: string | null;
  title: string;
  tags: {value: string; label: string}[];
  description: string;
  date: string;
  slug: string;
}