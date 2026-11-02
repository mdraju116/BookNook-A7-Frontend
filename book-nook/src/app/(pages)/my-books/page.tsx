"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { BookPlus, Pencil, RefreshCw, Trash2 } from "lucide-react";
import { useSession } from "@/lib/auth-client";
import { getClientToken } from "@/lib/access-jwt-at-client-component";
import { Spinner } from "@/components/ui/spinner";
import BookCard from "@/components/books/BookCard";
import type { Book } from "@/types/book";

export default function MyBooksPage() {
  const { data: session, isPending } = useSession();
  const user = session?.user;
  const userId = user?.id;
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [reloadCount, setReloadCount] = useState(0);

  useEffect(() => {
    if (isPending) return;

    if (!userId) return;

    let isCurrent = true;

    async function loadBooks() {
      setIsLoading(true);
      setErrorMessage(null);

      try {
        const baseUrl = process.env.NEXT_PUBLIC_SERVER_BASE_URL?.replace(/\/$/, "");
        if (!baseUrl) throw new Error("The book server is not configured.");

        const jwtToken = await getClientToken();
        if (!jwtToken) throw new Error("Could not verify your session. Please sign in again.");

        const response = await fetch(`${baseUrl}/my-books`, {
          headers: { Authorization: `Bearer ${jwtToken}` },
          cache: "no-store",
        });
        const result: unknown = await response.json().catch(() => null);

        if (!response.ok) {
          const message = result && typeof result === "object" && "message" in result && typeof result.message === "string"
            ? result.message
            : "Could not load your books. Please try again.";
          throw new Error(message);
        }
        if (!Array.isArray(result)) throw new Error("The books service returned an invalid response.");

        if (isCurrent) setBooks(result as Book[]);
      } catch (error) {
        if (isCurrent) {
          setErrorMessage(error instanceof Error ? error.message : "Could not load your books. Please try again.");
        }
      } finally {
        if (isCurrent) setIsLoading(false);
      }
    }

    void loadBooks();
    return () => {
      isCurrent = false;
    };
  }, [isPending, userId, reloadCount]);

  if (isPending) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center gap-3 bg-[#faf9f5] px-4">
        <Spinner className="size-5 text-[#315b45]" />
        <span className="text-sm font-medium text-[#536657]">Checking your account...</span>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center bg-[#faf9f5] px-4 py-12">
        <section className="max-w-md rounded-3xl border border-[#e8e5dc] bg-white p-8 text-center shadow-sm">
          <h1 className="font-serif text-2xl font-bold text-[#263b30]">Sign in to see your books</h1>
          <p className="mt-2 text-sm leading-6 text-[#687168]">Your personal collection will be waiting here.</p>
          <Link href="/sign-in" className="mt-5 inline-flex rounded-full bg-[#315b45] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#254936]">Sign In</Link>
        </section>
      </main>
    );
  }

  if (isLoading) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center gap-3 bg-[#faf9f5] px-4">
        <Spinner className="size-5 text-[#315b45]" />
        <span className="text-sm font-medium text-[#536657]">Loading your books...</span>
      </main>
    );
  }

  return (
    <main className="min-h-[70vh] bg-[#faf9f5]">
      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16">
        {/* Page heading and collection count */}
        <header className="relative mb-10 border-b border-[#e8e5dc] pb-8 text-center">
          {/* <p className="mb-3 flex items-center justify-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-[#66816d]"><BookPlus size={17} /> Your collection</p> */}
          <h1 className="font-serif text-4xl font-bold tracking-tight text-[#263b30] sm:text-5xl">My Books</h1>
          <p className="mx-auto mt-3 max-w-xl text-base leading-7 text-[#687168]">Books you have shared with the BookNook community.</p>
          {!errorMessage && <span className="mt-4 inline-flex rounded-full bg-[#e8eee7] px-3 py-1.5 text-sm font-semibold text-[#315b45] sm:absolute sm:right-0 sm:bottom-8 sm:mt-0">{books.length} {books.length === 1 ? "book" : "books"}</span>}
        </header>

        {/* Loading error, empty collection, or contributed book cards */}
        {errorMessage ? (
          <div role="alert" className="rounded-3xl border border-[#e8e5dc] bg-white px-6 py-14 text-center">
            <h2 className="font-serif text-2xl font-bold text-[#263b30]">We couldn’t load your books</h2>
            <p className="mt-2 text-sm text-[#687168]">{errorMessage}</p>
            <button type="button" onClick={() => setReloadCount((count) => count + 1)} className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#315b45] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#254936]">
              <RefreshCw size={16} /> Try again
            </button>
          </div>
        ) : books.length === 0 ? (
          <div className="rounded-3xl border border-[#e8e5dc] bg-white px-6 py-16 text-center">
            <BookPlus className="mx-auto mb-4 text-[#78907d]" size={34} />
            <h2 className="font-serif text-2xl font-bold text-[#263b30]">Your shelves are ready</h2>
            <p className="mt-2 text-[#687168]">You haven’t added any books yet. Share one with the community to see it here.</p>
            <Link href="/add-book" className="mt-5 inline-flex rounded-full bg-[#315b45] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#254936]">Add a Book</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {books.map((book) => (
              <BookCard
                key={book._id}
                book={book}
                actions={
                  <>
                    <button type="button" disabled title="Editing will be available soon" aria-label={`Edit ${book.title || "book"} (coming soon)`} className="inline-flex cursor-not-allowed items-center gap-2 rounded-full border border-[#d9ded5] px-4 py-2 text-sm font-semibold text-[#667267] opacity-70">
                      <Pencil size={15} /> Edit
                    </button>
                    <button type="button" disabled title="Deleting will be available soon" aria-label={`Delete ${book.title || "book"} (coming soon)`} className="inline-flex cursor-not-allowed items-center gap-2 rounded-full border border-[#ead6d3] px-4 py-2 text-sm font-semibold text-[#9c6861] opacity-70">
                      <Trash2 size={15} /> Delete
                    </button>
                  </>
                }
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
