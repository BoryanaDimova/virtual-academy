export interface Course {
  id?: number;
  title: string;
  description: string;
  datePublished: Date;
  imageUrl?: string;
  ratingsSum: number;
  ratingsCount: number;
}
