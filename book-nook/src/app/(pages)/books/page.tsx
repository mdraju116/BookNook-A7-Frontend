import type { Metadata } from "next";
import type { Book } from "@/types/book";
import AllBooksCatalog from "@/components/books/AllBooksCatalog";

export const metadata: Metadata = {
  title: "All Books",
};

export default async function AllBooksPage() {
  let books: Book[] | null = null;

  try {
    const baseUrl = process.env.NEXT_PUBLIC_SERVER_BASE_URL?.replace(/\/$/, "");

    if (!baseUrl) throw new Error("The book server is not configured.");

    const response = await fetch(`${baseUrl}/books`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Books API returned ${response.status}.`);
    }

    const result: unknown = await response.json();

    if (!Array.isArray(result)) {
      throw new Error("Books API returned an invalid response.");
    }

    books = result as Book[];
  } catch (error) {
    console.error("Could not load books:", error);
  }

  return (
    <main className="min-h-[70vh] bg-[#faf9f5]">
      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16">
        <AllBooksCatalog books={books} />
      </section>
    </main>
  );
}