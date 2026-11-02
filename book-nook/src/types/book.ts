export type Book = {
  _id: string;
  title?: string;
  author?: string;
  category?: string;
  description?: string;
  image?: string;
  addedAt?: string;
  addedBy?: {
    name?: string;
    email?: string;
  };
};
