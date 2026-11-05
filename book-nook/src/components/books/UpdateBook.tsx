
"use client";

import { useState, type FormEvent } from "react";
import { Pencil } from "lucide-react";
import { toast } from "react-hot-toast";
import { getClientToken } from "@/lib/access-jwt-at-client-component";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import type { Book } from "@/types/book";

type BookForm = {
  title: string;
  author: string;
  category: string;
  description: string;
  image: string;
  totalCopies: string;
};

type UpdateBookProps = {
  book: Book;
  onUpdated: (updatedBook: Book) => void;
};

const categories = ["Fiction", "Science", "History", "Kids", "Others"];

const inputClassName =
  "mt-1.5 h-10 w-full rounded-lg border border-[#c9dbcd] bg-white px-3 font-normal outline-none focus:border-[#068a3f] focus:ring-2 focus:ring-[#068a3f]/15 dark:border-[#475569] dark:bg-[#24352b] dark:text-white dark:placeholder:text-gray-400";

// Convert an API book into the editable form shape used by the dialog fields.
function getBookForm(book: Book): BookForm {
  return {
    title: book.title || "",
    author: book.author || "",
    category: book.category || "",
    description: book.description || "",
    image: book.image || "",
    totalCopies: String(book.totalCopies ?? 1),
  };
}

// Modal editor for changing the metadata of a reader-contributed book.
export default function UpdateBook({ book, onUpdated }: UpdateBookProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [bookForm, setBookForm] = useState<BookForm>(() =>
    getBookForm(book)
  );
  const [isSaving, setIsSaving] = useState(false);

  // Persist the edited fields, then hand the normalized result back to the catalog.
  const handleUpdate = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSaving) return;

    try {
      setIsSaving(true);

      const baseUrl = process.env.NEXT_PUBLIC_SERVER_BASE_URL?.replace(/\/$/, "");

      if (!baseUrl) {
        throw new Error("The book server is not configured.");
      }

      const jwtToken = await getClientToken();

      if (!jwtToken) {
        throw new Error("Could not verify your session. Please sign in again.");
      }

      const response = await fetch(
        `${baseUrl}/books/${encodeURIComponent(book._id)}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${jwtToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...bookForm,
            totalCopies: Number(bookForm.totalCopies),
          }),
        }
      );

      const result: unknown = await response.json().catch(() => null);

      if (!response.ok) {
        const message =
          result &&
          typeof result === "object" &&
          "message" in result &&
          typeof result.message === "string"
            ? result.message
            : "Could not update this book. Please try again.";

        throw new Error(message);
      }

      onUpdated({
        ...book,
        ...bookForm,
        totalCopies: Number(bookForm.totalCopies),
      });

      setIsOpen(false);
      toast.success("Book updated successfully.");
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Could not update this book. Please try again."
      );
    } finally {
      setIsSaving(false);
    }
  };

  // Reset stale form values each time the editor opens.
  const openDialog = () => {
    setBookForm(getBookForm(book));
    setIsOpen(true);
  };

  return (
    <>
      <button
        type="button"
        onClick={openDialog}
        aria-label={`Edit ${book.title || "book"}`}
        className="inline-flex items-center gap-2 rounded-full border border-[#d9ded5] px-4 py-2 text-sm font-semibold text-[#068a3f] transition hover:bg-[#f1f5ef]"
      >
        <Pencil size={15} />
        Edit
      </button>

      <Dialog
        open={isOpen}
        onOpenChange={(open) => {
          if (!isSaving) setIsOpen(open);
        }}
      >
        <DialogContent className="max-h-[90vh] overflow-y-auto bg-white text-[#263b30] dark:border-[#334155] dark:bg-[#17231d] dark:text-white sm:max-w-xl">
          <DialogHeader>
            <DialogTitle className="font-serif text-xl font-bold text-[#263b30] dark:text-white">
              Edit book
            </DialogTitle>

            <DialogDescription className="text-[#687168] dark:text-gray-300">
              Update the book details, then save your changes.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleUpdate} className="space-y-4">
            <label className="block text-sm font-semibold text-[#34463a] dark:text-gray-100">
              Book title
              <input
                required
                maxLength={160}
                value={bookForm.title}
                onChange={(event) =>
                  setBookForm((form) => ({
                    ...form,
                    title: event.target.value,
                  }))
                }
                className={inputClassName}
              />
            </label>

            <label className="block text-sm font-semibold text-[#34463a] dark:text-gray-100">
              Author
              <input
                required
                maxLength={120}
                value={bookForm.author}
                onChange={(event) =>
                  setBookForm((form) => ({
                    ...form,
                    author: event.target.value,
                  }))
                }
                className={inputClassName}
              />
            </label>

            <label className="block text-sm font-semibold text-[#34463a] dark:text-gray-100">
              Category
              <select
                required
                value={bookForm.category}
                onChange={(event) =>
                  setBookForm((form) => ({
                    ...form,
                    category: event.target.value,
                  }))
                }
                className={inputClassName}
              >
                <option value="" disabled>
                  Select a category
                </option>

                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </label>

            <label className="block text-sm font-semibold text-[#34463a] dark:text-gray-100">
              Cover image URL
              <input
                required
                type="url"
                maxLength={2048}
                value={bookForm.image}
                onChange={(event) =>
                  setBookForm((form) => ({
                    ...form,
                    image: event.target.value,
                  }))
                }
                className={inputClassName}
              />
            </label>

            <label className="block text-sm font-semibold text-[#34463a] dark:text-gray-100">
              Total Copies
              <input
                required
                type="number"
                min={1}
                step={1}
                value={bookForm.totalCopies}
                onChange={(event) =>
                  setBookForm((form) => ({
                    ...form,
                    totalCopies: event.target.value,
                  }))
                }
                className={inputClassName}
              />
            </label>

            <label className="block text-sm font-semibold text-[#34463a] dark:text-gray-100">
              Description
              <Textarea
                required
                minLength={10}
                maxLength={1200}
                rows={4}
                value={bookForm.description}
                onChange={(event) =>
                  setBookForm((form) => ({
                    ...form,
                    description: event.target.value,
                  }))
                }
                className="mt-1.5 resize-y border-[#c9dbcd] focus-visible:border-[#068a3f] focus-visible:ring-[#068a3f]/15 dark:border-[#475569] dark:bg-[#24352b] dark:text-white dark:placeholder:text-gray-400"
              />
            </label>

            <DialogFooter className="mt-5">
              <Button
                type="button"
                variant="outline"
                disabled={isSaving}
                onClick={() => setIsOpen(false)}
                className="dark:border-[#475569] dark:bg-[#24352b] dark:text-gray-200 dark:hover:bg-[#334155]"
              >
                Cancel
              </Button>

              <Button
                type="submit"
                disabled={isSaving}
                className="bg-[#068a3f] text-white hover:bg-[#057536]"
              >
                {isSaving ? (
                  <>
                    <Spinner className="size-4" />
                    Saving...
                  </>
                ) : (
                  "Save changes"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
