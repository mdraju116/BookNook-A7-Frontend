"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";
import { getClientToken } from "@/lib/access-jwt-at-client-component";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Spinner } from "@/components/ui/spinner";
import type { Borrow } from "@/types/borrow";

type ReturnBookProps = {
  borrow: Borrow;
  onReturned: (borrowId: string) => void;
};

// Return action for a borrow record, protected by a destructive-action confirmation.
export default function ReturnBook({ borrow, onReturned }: ReturnBookProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isReturning, setIsReturning] = useState(false);

  // Confirm the return with the API before updating the parent borrow list.
  const handleReturn = async () => {
    if (isReturning) return;

    try {
      setIsReturning(true);
      const baseUrl = process.env.NEXT_PUBLIC_SERVER_BASE_URL?.replace(/\/$/, "");
      if (!baseUrl) throw new Error("The book server is not configured.");

      const jwtToken = await getClientToken();
      if (!jwtToken) throw new Error("Could not verify your session. Please sign in again.");

      const response = await fetch(`${baseUrl}/borrows/${encodeURIComponent(borrow._id)}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${jwtToken}` },
      });
      const result: unknown = await response.json().catch(() => null);

      if (!response.ok) {
        const message = result && typeof result === "object" && "message" in result && typeof result.message === "string"
          ? result.message
          : "Could not return this book. Please try again.";
        throw new Error(message);
      }

      onReturned(borrow._id);
      setIsOpen(false);
      toast.success("Book returned successfully.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not return this book. Please try again.");
    } finally {
      setIsReturning(false);
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={(open) => {
      if (!isReturning) setIsOpen(open);
    }}>
      <button type="button" onClick={() => setIsOpen(true)} className="rounded-full border border-[#d9ded5] px-4 py-2 text-sm font-semibold text-[#068a3f] transition hover:bg-[#f1f5ef]">
        Return Book
      </button>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="font-serif text-lg font-bold text-[#263b30] dark:text-white">Return this book?</AlertDialogTitle>
          <AlertDialogDescription>
            Return &quot;{borrow.bookTitle || "Untitled book"}&quot; and remove it from your borrowed books?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isReturning}>Cancel</AlertDialogCancel>
          <AlertDialogAction type="button" onClick={handleReturn} disabled={isReturning} className="bg-[#068a3f] text-white hover:bg-[#057536]">
            {isReturning ? <><Spinner className="size-4" /> Returning...</> : "Confirm Return"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
