import { BookOpen, LibraryBig } from "lucide-react";
import type { Book } from "@/types/book";
import BookCard from "@/components/books/BookCard";

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
        <div className="mb-10 flex flex-col justify-between gap-6 border-b border-[#e8e5dc] pb-8 sm:flex-row sm:items-end">
          <div>
            <div className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-[#66816d]">
              <LibraryBig size={17} /> The BookNook library
            </div>
            <h1 className="font-serif text-4xl font-bold tracking-tight text-[#263b30] sm:text-5xl">Browse all books</h1>
            <p className="mt-3 max-w-xl text-base leading-7 text-[#687168]">
              Find your next good read, from much-loved classics to new discoveries.
            </p>
          </div>
          {books && <p className="text-sm font-medium text-[#768076]">{books.length} {books.length === 1 ? "book" : "books"} in the collection</p>}
        </div>

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
