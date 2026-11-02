import Link from "next/link";
import { ArrowRight, BookOpen, LibraryBig } from "lucide-react";
import { db } from "@/lib/auth";

type Book = {
  _id: { toString(): string };
  title?: string;
  author?: string;
  category?: string;
  image?: string;
};

async function getBooks(): Promise<Book[] | null> {
  try {
    return await db.collection<Book>("books").find({}).sort({ addedAt: -1 }).toArray();
  } catch (error) {
    console.error("Could not load books:", error);
    return null;
  }
}

export default async function AllBooksPage() {
  const books = await getBooks();

  return (
    <main className="min-h-[70vh] bg-[#faf9f5]">
      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16">
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
              <article key={book._id.toString()} className="group flex h-full flex-col overflow-hidden rounded-3xl border border-[#e9e5dc] bg-white shadow-[0_5px_22px_rgba(42,59,46,0.04)] transition duration-200 hover:-translate-y-1 hover:shadow-[0_14px_34px_rgba(42,59,46,0.11)]">
                <div className="relative aspect-[4/3] overflow-hidden bg-[#edf0e9]">
                  {book.image ? (
                    // Book covers are user-supplied URLs, so use a regular image element without remote host configuration.
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={book.image} alt={`Cover of ${book.title || "book"}`} className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]" />
                  ) : (
                    <div className="flex h-full flex-col items-center justify-center gap-3 text-[#7a8d7d]">
                      <BookOpen size={42} strokeWidth={1.4} />
                      <span className="font-serif text-lg">BookNook</span>
                    </div>
                  )}
                  {book.category && <span className="absolute left-4 top-4 rounded-full bg-[#fffdf9]/95 px-3 py-1.5 text-xs font-semibold text-[#315b45] shadow-sm">{book.category}</span>}
                </div>
                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#809082]">{book.category || "From the collection"}</p>
                  <h2 className="line-clamp-2 font-serif text-xl font-bold leading-snug text-[#263b30]">{book.title || "Untitled book"}</h2>
                  <p className="mt-2 text-sm text-[#747a72]">by <span className="font-medium text-[#4c5c50]">{book.author || "Unknown author"}</span></p>
                  <Link href={`/books/${book._id.toString()}`} className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-[#315b45] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#254936] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#315b45]">
                    View Details <ArrowRight size={16} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
