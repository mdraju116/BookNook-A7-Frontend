import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import type { Book } from "@/types/book";
import BookCard from "@/components/books/BookCard";

export default async function NewArrivals() {
  // Fetch the latest six books from the backend.
  let books: Book[] | null = null;
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SERVER_BASE_URL?.replace(/\/$/, "");
    if (!baseUrl) throw new Error("The book server is not configured.");

    const response = await fetch(`${baseUrl}/new-arrivals`, { cache: "no-store" });
    if (!response.ok) throw new Error(`New arrivals API returned ${response.status}.`);

    const result: unknown = await response.json();
    if (!Array.isArray(result)) throw new Error("Books API returned an invalid response.");
    books = result as Book[];
  } catch (error) {
    console.error("Could not load new arrivals:", error);
  }

  const newestBooks = books;

  return (
    /* New arrivals section */
    <section className="bg-[#fbf8f1]">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-8 sm:py-18">
        {/* Section heading */}
        <div className="mb-8 flex flex-col items-center text-center sm:mb-10">
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#8c7350] dark:text-muted-foreground">Fresh on the shelves</p>
            <h2 className="font-serif text-3xl font-bold tracking-tight text-[#263b30] dark:text-white sm:text-4xl">New Arrivals</h2>
            <p className="mt-3 max-w-xl text-sm leading-6 text-[#68736a] dark:text-muted-foreground sm:text-base">
              Take a look at the latest stories to find their way into BookNook.
            </p>
          </div>
        </div>

        {/* API error, empty state, or latest book cards */}
        {newestBooks === null ? (
          <div className="rounded-2xl border border-[#e9e2d8] bg-white px-6 py-12 text-center">
            <BookOpen className="mx-auto mb-3 text-[#78907d]" size={32} />
            <p className="font-serif text-xl font-bold text-[#263b30] dark:text-white">New arrivals are taking a moment</p>
            <p className="mt-2 text-sm text-[#68736a]">Please refresh the page to try loading the collection again.</p>
          </div>
        ) : newestBooks.length === 0 ? (
          <div className="rounded-2xl border border-[#e9e2d8] bg-white px-6 py-12 text-center">
            <BookOpen className="mx-auto mb-3 text-[#78907d]" size={32} />
            <p className="font-serif text-xl font-bold text-[#263b30] dark:text-white">New stories are on the way</p>
            <p className="mt-2 text-sm text-[#68736a]">There are no books in the collection yet. Check back soon.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:gap-7">
            {newestBooks.map((book) => (
              <BookCard key={book._id} book={book} isNew />
            ))}
          </div>
        )}

        {/* Link to the full book collection */}
        <div className="mt-9 flex justify-center sm:mt-11">
          <Link
            href="/books"
            className="inline-flex items-center gap-2 rounded-full bg-[#068a3f] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#057536] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#068a3f]"
          >
            See All Books
            <ArrowRight size={17} />
          </Link>
        </div>
      </div>
    </section>
  );
}
