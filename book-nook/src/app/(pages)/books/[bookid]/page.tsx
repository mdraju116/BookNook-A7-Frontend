import { notFound } from "next/navigation";
import Image from "next/image";
import { ArrowLeft, BookOpen, UserRound } from "lucide-react";
import Link from "next/link";
import type { Book } from "@/types/book";
import BorrowBook from "@/components/books/BorrowBook";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book Details",
};

export default async function BookDetailsPage({ params }: PageProps<"/books/[bookid]">) {
  const { bookid } = await params;
  if (!/^[\da-f]{24}$/i.test(bookid)) notFound();
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_BASE_URL?.replace(/\/$/, "");
  if (!baseUrl) throw new Error("The book server is not configured.");

  const response = await fetch(`${baseUrl}/books/${encodeURIComponent(bookid)}`, { cache: "no-store" });
  let book: Book | null = null;

  if (response.status === 404) {
    // Fall back to the collection endpoint while the backend's /books/:id route is unavailable.
    const booksResponse = await fetch(`${baseUrl}/books`, { cache: "no-store" });
    if (!booksResponse.ok) throw new Error(`Books API returned ${booksResponse.status}.`);
    const booksResult: unknown = await booksResponse.json();
    if (Array.isArray(booksResult)) {
      book = (booksResult as Book[]).find((item) => item._id === bookid) || null;
    }
  } else {
    if (!response.ok) throw new Error(`Book details API returned ${response.status}.`);
    const result: unknown = await response.json();
    book = result && typeof result === "object" && "_id" in result ? result as Book : null;
  }

  if (!book) notFound();

  const addedByName = book.addedBy?.name || "A BookNook reader";
  const addedByEmail = book.addedBy?.email;

  return (
    <main className="min-h-[70vh] bg-[#faf9f5] px-5 py-10 sm:px-8 sm:py-16">
      {/* Return to the complete book collection */}
      <div className="mx-auto max-w-6xl">
        <Link href="/books" className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#d8ded5] bg-white px-4 py-2.5 text-sm font-semibold text-[#068a3f] shadow-sm transition hover:bg-[#f1f5ef] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#068a3f]">
          <ArrowLeft size={17} /> Back to all books
        </Link>
      </div>
      {/* Book cover and book information */}
      <article className="mx-auto grid max-w-6xl overflow-hidden rounded-3xl border border-[#e8e5dc] bg-white shadow-[0_12px_50px_rgba(42,59,46,0.08)] lg:grid-cols-[0.9fr_1.1fr]">
        {/* Book cover image or fallback artwork */}
        <div className="relative flex min-h-80 items-center justify-center bg-[#edf0e9] p-8 sm:min-h-140">
          {book.image ? (
            <Image src={book.image} alt={`Cover of ${book.title || "book"}`} fill sizes="(max-width: 1024px) 100vw, 50vw" unoptimized className="object-contain p-8 drop-shadow-xl" />
          ) : (
            <div className="flex flex-col items-center gap-4 text-[#78907d]">
              <BookOpen size={64} strokeWidth={1.3} />
              <span className="font-serif text-2xl">BookNook</span>
            </div>
          )}
        </div>

        {/* Title, description, contributor, and borrow action */}
        <div className="flex flex-col p-6 sm:p-10 lg:p-12">
          <p className="mb-4 w-fit rounded-full bg-[#e8eee7] px-4 py-2 text-xs font-bold uppercase tracking-[0.15em] text-[#068a3f]">
            {book.category || "From the collection"}
          </p>
          <h1 className="font-serif text-3xl font-bold leading-tight tracking-tight text-[#263b30] sm:text-4xl">{book.title || "Untitled book"}</h1>
          <p className="mt-3 text-lg text-[#687168]">by <span className="font-semibold text-[#405548]">{book.author || "Unknown author"}</span></p>
          <p className={`mt-4 text-sm font-semibold ${typeof book.totalCopies === "number" && book.totalCopies <= 0 ? "text-red-600" : "text-[#068a3f]"}`}>
            {typeof book.totalCopies === "number" && book.totalCopies <= 0 ? "Not Available" : `${typeof book.totalCopies === "number" ? book.totalCopies : 1} ${typeof book.totalCopies === "number" && book.totalCopies === 1 ? "copy" : "copies"} available`}
          </p>

          <div className="my-8 h-px bg-[#e9e5dc]" />

          <section aria-labelledby="book-description-heading">
            <h2 id="book-description-heading" className="font-serif text-xl font-bold text-[#263b30]">About this book</h2>
            <p className="mt-3 whitespace-pre-line text-[15px] leading-7 text-[#687168]">{book.description || "No description has been added for this book yet."}</p>
          </section>

          <section className="mt-8 rounded-2xl bg-[#f5f7f2] p-5" aria-labelledby="added-by-heading">
            <h2 id="added-by-heading" className="text-xs font-bold uppercase tracking-[0.14em] text-[#829080]">Added by</h2>
            <div className="mt-3 flex items-start gap-3 text-[#405548]">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#e5ece3] text-[#068a3f]"><UserRound size={19} /></span>
              <div className="min-w-0">
                <p className="font-semibold">{addedByName}</p>
                {addedByEmail && <p className="mt-0.5 break-all text-sm text-[#7a8278]">{addedByEmail}</p>}
              </div>
            </div>
          </section>

          <BorrowBook book={book} />
        </div>
      </article>
    </main>
  );
}
