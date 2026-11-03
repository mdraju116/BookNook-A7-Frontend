"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { BookOpen } from "lucide-react";
import { toast } from "react-hot-toast";
import { useSession } from "@/lib/auth-client";
import { getClientToken } from "@/lib/access-jwt-at-client-component";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Spinner } from "@/components/ui/spinner";
import type { Book } from "@/types/book";

type BorrowBookProps = {
  book: Book;
};

const BORROW_PERIOD_DAYS = 30;

export default function BorrowBook({ book }: BorrowBookProps) {
  const { data: session, isPending } = useSession();
  const user = session?.user;
  const router = useRouter();
  const availableCopies = typeof book.totalCopies === "number" ? book.totalCopies : 1;
  const isUnavailable = availableCopies <= 0;
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [returnDatePreview, setReturnDatePreview] = useState("");

  const openBorrowDialog = () => {
    const returnDate = new Date();
    returnDate.setDate(returnDate.getDate() + BORROW_PERIOD_DAYS);
    setReturnDatePreview(returnDate.toLocaleDateString());
    setIsOpen(true);
  };

  const handleBorrow = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!user || isSubmitting || isUnavailable) return;

    try {
      setIsSubmitting(true);
      const baseUrl = process.env.NEXT_PUBLIC_SERVER_BASE_URL?.replace(/\/$/, "");
      if (!baseUrl) throw new Error("The book server is not configured.");

      const jwtToken = await getClientToken();
      if (!jwtToken) throw new Error("Could not verify your session. Please sign in again.");

      const borrowDate = new Date();
      const returnDate = new Date(borrowDate);
      returnDate.setDate(returnDate.getDate() + BORROW_PERIOD_DAYS);

      const response = await fetch(`${baseUrl}/borrows`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bookId: book._id,
          bookTitle: book.title || "Untitled book",
          bookImage: book.image || "",
          userEmail: user.email,
          borrowDate: borrowDate.toISOString(),
          returnDate: returnDate.toISOString(),
        }),
      });
      const result: unknown = await response.json().catch(() => null);

      if (!response.ok) {
        const message = result && typeof result === "object" && "message" in result && typeof result.message === "string"
          ? result.message
          : "Could not borrow this book. Please try again.";
        throw new Error(message);
      }

      setIsOpen(false);
      toast.success("Borrow request submitted successfully.");
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not borrow this book. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Button type="button" disabled={isPending || !user || isUnavailable} onClick={openBorrowDialog} className="mt-8 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#068a3f] px-6 py-3 font-semibold text-white transition hover:bg-[#057536] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#068a3f]">
        <BookOpen size={19} /> {isUnavailable ? "Not Available" : "Borrow This Book"}
      </Button>

      <Dialog open={isOpen} onOpenChange={(open) => {
        if (!isSubmitting) setIsOpen(open);
      }}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-serif text-xl font-bold text-[#263b30]">Borrow this book</DialogTitle>
            <DialogDescription>Confirm your account details to add this book to your borrows.</DialogDescription>
          </DialogHeader>

          <form onSubmit={handleBorrow} className="space-y-4">
            <label className="block text-sm font-semibold text-[#34463a]">
              User name
              <input readOnly value={user?.name || ""} className="mt-1.5 h-10 w-full rounded-lg border border-[#d9e6dc] bg-[#f3f7f3] px-3 font-normal text-[#587060]" />
            </label>
            <label className="block text-sm font-semibold text-[#34463a]">
              Email
              <input readOnly type="email" value={user?.email || ""} className="mt-1.5 h-10 w-full rounded-lg border border-[#d9e6dc] bg-[#f3f7f3] px-3 font-normal text-[#587060]" />
            </label>
            <p className="text-xs leading-5 text-[#768076]">Return by {returnDatePreview} (30-day borrowing period).</p>

            <DialogFooter className="mt-5">
              <Button type="button" variant="outline" disabled={isSubmitting} onClick={() => setIsOpen(false)}>Cancel</Button>
              <Button type="submit" disabled={isSubmitting || !user || isUnavailable} className="bg-[#068a3f] text-white hover:bg-[#057536]">
                {isSubmitting ? <><Spinner className="size-4" /> Submitting...</> : "Confirm Borrow"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
