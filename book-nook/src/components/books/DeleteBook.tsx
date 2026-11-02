"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
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
import type { Book } from "@/types/book";

type DeleteBookProps = {
  book: Book;
  onDeleted: (bookId: string) => void;
};

export default function DeleteBook({ book, onDeleted }: DeleteBookProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (isDeleting) return;

    try {
      setIsDeleting(true);
      const baseUrl = process.env.NEXT_PUBLIC_SERVER_BASE_URL?.replace(/\/$/, "");
      if (!baseUrl) throw new Error("The book server is not configured.");

      const jwtToken = await getClientToken();
      if (!jwtToken) throw new Error("Could not verify your session. Please sign in again.");

      const response = await fetch(`${baseUrl}/books/${encodeURIComponent(book._id)}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${jwtToken}` },
      });
      const result: unknown = await response.json().catch(() => null);

      if (!response.ok) {
        const message = result && typeof result === "object" && "message" in result && typeof result.message === "string"
          ? result.message
          : "Could not delete this book. Please try again.";
        throw new Error(message);
      }

      onDeleted(book._id);
      setIsOpen(false);
      toast.success("Book deleted successfully.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not delete this book. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={(open) => {
      if (!isDeleting) setIsOpen(open);
    }}>
      <button type="button" onClick={() => setIsOpen(true)} aria-label={`Delete ${book.title || "book"}`} className="inline-flex items-center gap-2 rounded-full border border-[#ead6d3] px-4 py-2 text-sm font-semibold text-[#9c5149] transition hover:bg-[#fbf1ef]">
        <Trash2 size={15} /> Delete
      </button>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="font-serif text-lg font-bold text-[#263b30]">Delete this book?</AlertDialogTitle>
          <AlertDialogDescription>
            “{book.title || "Untitled book"}” will be removed from your collection. This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
          <AlertDialogAction type="button" onClick={handleDelete} disabled={isDeleting} className="bg-red-700 text-white hover:bg-red-800">
            {isDeleting ? <><Spinner className="size-4" /> Deleting...</> : "Delete book"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
