"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, BookOpen, RefreshCw } from "lucide-react";
import { useSession } from "@/lib/auth-client";
import { getClientToken } from "@/lib/access-jwt-at-client-component";
import { Spinner } from "@/components/ui/spinner";
import ReturnBook from "@/components/books/ReturnBook";
import type { Borrow } from "@/types/borrow";

function formatDate(value?: string) {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(date);
}

export default function MyBorrowsPage() {
  const { data: session, isPending } = useSession();
  const userId = session?.user?.id;
  const [borrows, setBorrows] = useState<Borrow[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [reloadCount, setReloadCount] = useState(0);

  const handleBorrowReturned = (borrowId: string) => {
    setBorrows((currentBorrows) => currentBorrows.filter((borrow) => borrow._id !== borrowId));
  };

  useEffect(() => {
    if (isPending || !userId) return;

    let isCurrent = true;

    async function loadBorrows() {
      setIsLoading(true);
      setErrorMessage(null);

      try {
        const baseUrl = process.env.NEXT_PUBLIC_SERVER_BASE_URL?.replace(/\/$/, "");
        if (!baseUrl) throw new Error("The book server is not configured.");

        const jwtToken = await getClientToken();
        if (!jwtToken) throw new Error("Could not verify your session. Please sign in again.");

        const response = await fetch(`${baseUrl}/borrows`, {
          headers: { Authorization: `Bearer ${jwtToken}` },
          cache: "no-store",
        });
        const result: unknown = await response.json().catch(() => null);

        if (!response.ok) {
          const message = result && typeof result === "object" && "message" in result && typeof result.message === "string"
            ? result.message
            : "Could not load your borrowed books. Please try again.";
          throw new Error(message);
        }
        if (!Array.isArray(result)) throw new Error("The borrows service returned an invalid response.");

        if (isCurrent) setBorrows(result as Borrow[]);
      } catch (error) {
        if (isCurrent) {
          setErrorMessage(error instanceof Error ? error.message : "Could not load your borrowed books. Please try again.");
        }
      } finally {
        if (isCurrent) setIsLoading(false);
      }
    }

    void loadBorrows();
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

  if (!session?.user) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center bg-[#faf9f5] px-4 py-12">
        <section className="max-w-md rounded-3xl border border-[#e8e5dc] bg-white p-8 text-center shadow-sm">
          <h1 className="font-serif text-2xl font-bold text-[#263b30]">Sign in to see your borrows</h1>
          <p className="mt-2 text-sm leading-6 text-[#687168]">Your borrowed books will be listed here.</p>
          <Link href="/sign-in" className="mt-5 inline-flex rounded-full bg-[#315b45] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#254936]">Sign In</Link>
        </section>
      </main>
    );
  }

  if (isLoading) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center gap-3 bg-[#faf9f5] px-4">
        <Spinner className="size-5 text-[#315b45]" />
        <span className="text-sm font-medium text-[#536657]">Loading your borrows...</span>
      </main>
    );
  }

  return (
    <main className="min-h-[70vh] bg-[#faf9f5]">
      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16">
        {/* Page heading and borrow count */}
        <header className="relative mb-10 border-b border-[#e8e5dc] pb-8 text-center">
          <h1 className="font-serif text-4xl font-bold tracking-tight text-[#263b30] sm:text-5xl">My Borrows</h1>
          <p className="mx-auto mt-3 max-w-xl text-base leading-7 text-[#687168]">Books you are currently borrowing from the community.</p>
          <Link href="/" className="mt-4 inline-flex items-center gap-2 rounded-full border border-[#d8ded5] bg-white px-4 py-2.5 text-sm font-semibold text-[#315b45] shadow-sm transition hover:bg-[#f1f5ef] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#315b45] sm:absolute sm:left-0 sm:bottom-8 sm:mt-0">
            <ArrowLeft size={17} /> Back to Home
          </Link>
          {!errorMessage && <span className="mt-4 inline-flex rounded-full bg-[#e8eee7] px-3 py-1.5 text-sm font-semibold text-[#315b45] sm:absolute sm:right-0 sm:bottom-8 sm:mt-0">{borrows.length} {borrows.length === 1 ? "book" : "books"}</span>}
        </header>

        {/* API error, empty state, or borrowed-books table */}
        {errorMessage ? (
          <div role="alert" className="rounded-3xl border border-[#e8e5dc] bg-white px-6 py-14 text-center">
            <h2 className="font-serif text-2xl font-bold text-[#263b30]">We couldn’t load your borrows</h2>
            <p className="mt-2 text-sm text-[#687168]">{errorMessage}</p>
            <button type="button" onClick={() => setReloadCount((count) => count + 1)} className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#315b45] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#254936]">
              <RefreshCw size={16} /> Try again
            </button>
          </div>
        ) : borrows.length === 0 ? (
          <div className="rounded-3xl border border-[#e8e5dc] bg-white px-6 py-16 text-center">
            <BookOpen className="mx-auto mb-4 text-[#78907d]" size={34} />
            <h2 className="font-serif text-2xl font-bold text-[#263b30]">No borrowed books yet</h2>
            <p className="mt-2 text-[#687168]">When you borrow a book, it will appear here.</p>
            <Link href="/books" className="mt-5 inline-flex rounded-full bg-[#315b45] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#254936]">Browse Books</Link>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-3xl border border-[#e8e5dc] bg-white shadow-sm">
            <table className="w-full min-w-[760px] border-collapse text-left">
              <thead className="bg-[#f3f5f0] text-xs uppercase tracking-[0.12em] text-[#718071]">
                <tr>
                  <th scope="col" className="px-6 py-4 font-semibold">Image</th>
                  <th scope="col" className="px-6 py-4 font-semibold">Title</th>
                  <th scope="col" className="px-6 py-4 font-semibold">Borrow Date</th>
                  <th scope="col" className="px-6 py-4 font-semibold">Return Date</th>
                  <th scope="col" className="px-6 py-4 font-semibold">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#eeeae2]">
                {borrows.map((borrow) => (
                  <tr key={borrow._id} className="align-middle transition-colors hover:bg-[#fcfcf9]">
                    <td className="px-6 py-4">
                      <div className="relative size-16 overflow-hidden rounded-xl bg-[#edf0e9]">
                        {borrow.bookImage ? (
                          <Image src={borrow.bookImage} alt={`Cover of ${borrow.bookTitle || "borrowed book"}`} fill sizes="64px" unoptimized className="object-cover" />
                        ) : (
                          <div className="flex h-full items-center justify-center text-[#78907d]"><BookOpen size={22} /></div>
                        )}
                      </div>
                    </td>
                    <th scope="row" className="max-w-xs px-6 py-4 font-serif text-base font-bold text-[#263b30]">{borrow.bookTitle || "Untitled book"}</th>
                    <td className="px-6 py-4 text-sm text-[#687168]">{formatDate(borrow.borrowDate)}</td>
                    <td className="px-6 py-4 text-sm text-[#687168]">{formatDate(borrow.returnDate)}</td>
                    <td className="px-6 py-4">
                      <ReturnBook borrow={borrow} onReturned={handleBorrowReturned} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
}
