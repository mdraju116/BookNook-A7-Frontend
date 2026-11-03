import { ArrowLeft, BookOpen } from "lucide-react";
import Link from "next/link";
import type { Book } from "@/types/book";
import BookCard from "@/components/books/BookCard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  	   title: "All Books",
	};

export default async function AllBooksPage() {
  let books: Book[] | null = null;
  
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SERVER_BASE_URL?.replace(/\/$/, "");
    if (!baseUrl) throw new Error("The book server is not configured.");

    const response = await fetch(`${baseUrl}/books`, { cache: "no-store" });
    if (!response.ok) throw new Error(`Books API returned ${response.status}.`);
    const result: unknown = await response.json();
    if (!Array.isArray(result)) throw new Error("Books API returned an invalid response.");
    books = result as Book[];
  } catch (error) {
    console.error("Could not load books:", error);
  }

  return (
    <main className="min-h-[70vh] bg-[#faf9f5]">
      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16">
        {/* Library title and book count */}
        <header className="relative mb-10 border-b border-[#e8e5dc] pb-8 text-center">
          <h1 className="font-serif text-4xl font-bold tracking-tight text-[#263b30] sm:text-5xl">Browse all books</h1>
          <p className="mx-auto mt-3 max-w-xl text-base leading-7 text-[#687168]">
            Find your next good read, from much-loved classics to new discoveries.
          </p>
          <Link href="/" className="mt-4 inline-flex items-center gap-2 rounded-full border border-[#d8ded5] bg-white px-4 py-2.5 text-sm font-semibold text-[#315b45] shadow-sm transition hover:bg-[#f1f5ef] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#315b45] sm:absolute sm:left-0 sm:bottom-8 sm:mt-0">
            <ArrowLeft size={17} /> Back to Home
          </Link>
          {books && <span className="mt-4 inline-flex rounded-full bg-[#e8eee7] px-3 py-1.5 text-sm font-semibold text-[#315b45] sm:absolute sm:right-0 sm:bottom-8 sm:mt-0">{books.length} {books.length === 1 ? "book" : "books"}</span>}
        </header>

        {/* Loading error, empty library, or book cards */}
        {books === null ? (
          <div className="rounded-3xl border border-[#e8e5dc] bg-white px-6 py-16 text-center">
            <BookOpen className="mx-auto mb-4 text-[#78907d]" size={34} />
            <h2 className="font-serif text-2xl font-bold text-[#263b30]">The library is taking a moment</h2>
            <p className="mt-2 text-[#687168]">We couldn’t load the books right now. Please refresh the page to try again.</p>
          </div>
        ) : books.length === 0 ? (
          <div className="rounded-3xl border border-[#e8e5dc] bg-white px-6 py-16 text-center">
            <BookOpen className="mx-auto mb-4 text-[#78907d]" size={34} />
            <h2 className="font-serif text-2xl font-bold text-[#263b30]">A little room for the first story</h2>
            <p className="mt-2 text-[#687168]">There are no books here yet. Check back soon for something to read.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {books.map((book) => (
              <BookCard key={book._id} book={book} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
