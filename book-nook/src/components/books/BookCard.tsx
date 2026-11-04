import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BookOpen } from "lucide-react";
import type { ReactNode } from "react";
import type { Book } from "@/types/book";

type BookCardProps = {
  book: Book;
  isNew?: boolean;
  actions?: ReactNode;
};

export default function BookCard({ book, isNew = false, actions }: BookCardProps) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-[#e9e5dc] bg-white shadow-[0_5px_22px_rgba(42,59,46,0.04)] transition duration-200 hover:-translate-y-1 hover:shadow-[0_14px_34px_rgba(42,59,46,0.11)]">
      {/* Cover image or fallback artwork */}
      <div className="relative aspect-4/3 overflow-hidden bg-[#edf0e9]">
        {book.image ? (
          <Image src={book.image} alt={`Cover of ${book.title || "book"}`} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" unoptimized className="object-cover transition duration-500 group-hover:scale-[1.03]" />
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-3 text-[#7a8d7d]">
            <BookOpen size={42} strokeWidth={1.4} />
            <span className="font-serif text-lg">BookNook</span>
          </div>
        )}
        {isNew && <span className="absolute left-4 top-4 rounded-full bg-[#fffdf9]/95 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-[#068a3f] shadow-sm">New</span>}
      </div>

      {/* Book title, category, author, and details link */}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="mb-2 flex items-center justify-between gap-3">
          <p className="rounded-full bg-[#e8eafd] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-[#4b55a8]">
            {book.category || "From the collection"}
          </p>
          <p
            aria-label={typeof book.totalCopies === "number" && book.totalCopies <= 0 ? "Not available" : `${typeof book.totalCopies === "number" ? book.totalCopies : 1} copies available`}
            className={`shrink-0 rounded-full px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.08em] ${typeof book.totalCopies === "number" && book.totalCopies <= 0 ? "bg-red-50 text-red-600" : "bg-[#e8eee7] text-[#068a3f]"}`}
          >
            {typeof book.totalCopies === "number" && book.totalCopies <= 0 ? "Not Available" : <><span className="text-sm font-extrabold leading-none">{typeof book.totalCopies === "number" ? book.totalCopies : 1}</span> available</>}
          </p>
        </div>
        <h2 className="line-clamp-2 font-serif text-xl font-bold leading-snug text-[#263b30] dark:text-white">{book.title || "Untitled book"}</h2>
        <p className="mt-2 text-sm text-[#747a72]">by <span className="font-medium text-[#4c5c50]">{book.author || "Unknown author"}</span></p>
        <div className="mt-auto flex justify-center pt-4">
          <Link href={`/books/${book._id}`} className="inline-flex w-fit items-center gap-2 rounded-full bg-[#068a3f] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#057536] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#068a3f]">
            View Details <ArrowRight size={16} />
          </Link>
        </div>
        {actions && <div className="mt-4 flex flex-wrap gap-2">{actions}</div>}
      </div>
    </article>
  );
}
