"use client"

import { useState, type FormEvent } from "react"
import { BookPlus, ImagePlus } from "lucide-react"
import { useSession } from "@/lib/auth-client"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "react-hot-toast"
import { getClientToken } from "@/lib/access-jwt-at-client-component"

const categories = ["Fiction", "Science", "History", "Kids", "Others"] as const

const AddBookPage = () => {
  const { data: session, isPending } = useSession()
  const user = session?.user
  const [isSaving, setIsSaving] = useState(false)
  const [coverUrl, setCoverUrl] = useState("")

  // Submit the book details without triggering a browser page navigation.
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (isSaving) return
    if (!user) {
      toast.error("Sign in to add a book.")
      return
    }
    if (!coverUrl) {
      toast.error("Enter a book cover image URL before submitting.")
      return
    }

    const form = event.currentTarget
    const formData = new FormData(form)
    const book = {
      title: String(formData.get("title") || "").trim(),
      author: String(formData.get("author") || "").trim(),
      category: String(formData.get("category") || ""),
      description: String(formData.get("description") || "").trim(),
      image: coverUrl,
      totalCopies: Number(formData.get("totalCopies")),
      addedBy: {
        userId: user.id,
        name: user.name || "BookNook reader",
        email: user.email,
      },
    }

    try {

      setIsSaving(true)

      const baseUrl = process.env.NEXT_PUBLIC_SERVER_BASE_URL?.replace(/\/$/, "")
      if (!baseUrl) throw new Error("The book server is not configured.")


      const jwtToken = await getClientToken();
      // console.log(" JWT Token:", jwtToken);  //NB: Need to submit the button

      if (!jwtToken) {
        throw new Error("JWT token is missing");
      }

      const response = await fetch(`${baseUrl}/add-book`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          //send token
          "Authorization": `Bearer ${jwtToken}`,
        },
        body: JSON.stringify(book),
      })
      const result = await response.json()
      if (!response.ok) throw new Error(result.error || "Could not add this book.")
      toast.success("Book added successfully!")
      form.reset()
      setCoverUrl("")
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not add this book.")
    } finally {
      setIsSaving(false)
    }
  }

  if (isPending) {
    return (
      <main className="bg-[#f7fbf7] px-4 py-10 sm:py-14">
        <section className="mx-auto max-w-3xl">
          <header className="mb-8 flex flex-col items-center gap-3">
            <Skeleton className="size-14 rounded-2xl" />
            <Skeleton className="h-10 w-52" />
            <Skeleton className="h-5 w-64" />
          </header>
          <div className="space-y-6 rounded-3xl border border-[#d6e9da] bg-white p-5 shadow-xl sm:p-8">
            <div className="grid gap-5 sm:grid-cols-2">
              <Skeleton className="h-16 w-full rounded-xl" />
              <Skeleton className="h-16 w-full rounded-xl" />
            </div>
            <Skeleton className="h-16 w-full rounded-xl" />
            <Skeleton className="h-16 w-full rounded-xl" />
            <Skeleton className="h-32 w-full rounded-xl" />
            <Skeleton className="h-12 w-full rounded-xl" />
          </div>
        </section>
      </main>
    )
  }

  // Show account details in the form as read-only fields.
  if (!user) {
    return <div className="flex min-h-96 items-center justify-center px-4 text-center text-sm text-[#476552]">Sign in to add a book.</div>
  }

  return (
    <main className="bg-[#f7fbf7] px-4 py-10 sm:py-14">
      <section className="mx-auto max-w-3xl">
        {/* Page heading */}
        <header className="mb-8 text-center">
          <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-2xl bg-[#e5f6e9] text-[#068a3f]"><BookPlus className="size-7" /></div>
          <h1 className="page-heading mt-2 text-3xl font-bold tracking-tight text-[#193b27] dark:text-white sm:text-4xl">Add a Book</h1>
          <p className="page-subheading mt-3 text-sm text-[#476552] dark:text-white sm:text-base">Share books with the community.</p>
        </header>

        {/* Book details and cover image URL form */}
        <form onSubmit={handleSubmit} className="space-y-6 rounded-3xl border border-[#d6e9da] bg-white p-5 shadow-xl shadow-[#068a3f]/8 sm:p-8">
          {/* Book title and author fields */}
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block text-sm font-semibold text-[#193b27]">Book title <span className="text-red-600">*</span>
              <input name="title" required maxLength={160} placeholder="e.g. The Great Gatsby" className="mt-2 h-11 w-full rounded-xl border border-[#c9dbcd] bg-white px-3 font-normal outline-none transition focus:border-[#068a3f] focus:ring-2 focus:ring-[#068a3f]/15" />
            </label>
            <label className="block text-sm font-semibold text-[#193b27]">Author name <span className="text-red-600">*</span>
              <input name="author" required maxLength={120} placeholder="e.g. F. Scott Fitzgerald" className="mt-2 h-11 w-full rounded-xl border border-[#c9dbcd] bg-white px-3 font-normal outline-none transition focus:border-[#068a3f] focus:ring-2 focus:ring-[#068a3f]/15" />
            </label>
          </div>

          {/* Category, cover URL, and description fields */}
          <label className="block text-sm font-semibold text-[#193b27]">Category <span className="text-red-600">*</span>
            <select name="category" required defaultValue="" className="mt-2 h-11 w-full rounded-xl border border-[#c9dbcd] bg-white px-3 font-normal outline-none focus:border-[#068a3f] focus:ring-2 focus:ring-[#068a3f]/15">
              <option value="" disabled>Select a category</option>
              {categories.map((category) => <option key={category} value={category}>{category}</option>)}
            </select>
          </label>

          <label className="block text-sm font-semibold text-[#193b27]">Book image URL <span className="text-red-600">*</span>
            <input name="image" type="url" required maxLength={2048} value={coverUrl} onChange={(event) => setCoverUrl(event.target.value)} placeholder="https://example.com/book-cover.jpg" className="mt-2 h-11 w-full rounded-xl border border-[#c9dbcd] bg-white px-3 font-normal outline-none transition focus:border-[#068a3f] focus:ring-2 focus:ring-[#068a3f]/15" />
            {coverUrl && <span className="mt-3 flex items-center gap-2 text-xs text-[#6c8473]"><ImagePlus className="size-4 shrink-0 text-[#068a3f]" /> Image URL entered</span>}
          </label>

          <label className="block text-sm font-semibold text-[#193b27]">Total Copies <span className="text-red-600">*</span>
            <input name="totalCopies" type="number" required min={1} step={1} defaultValue={1} placeholder="e.g. 3" className="mt-2 h-11 w-full rounded-xl border border-[#c9dbcd] bg-white px-3 font-normal outline-none transition focus:border-[#068a3f] focus:ring-2 focus:ring-[#068a3f]/15" />
            <span className="mt-1.5 block text-xs font-normal text-[#6c8473]">How many copies are available to borrow?</span>
          </label>

          <label className="block text-sm font-semibold text-[#193b27]">Short description <span className="text-red-600">*</span>
            <textarea name="description" required minLength={10} maxLength={1200} rows={4} placeholder="What should readers know about this book?" className="mt-2 w-full resize-y rounded-xl border border-[#c9dbcd] bg-white px-3 py-2.5 font-normal outline-none transition focus:border-[#068a3f] focus:ring-2 focus:ring-[#068a3f]/15" />
          </label>

          {/* Read-only owner information comes from the signed-in session. */}
          <div className="grid gap-5 rounded-2xl bg-[#f5faf6] p-4 sm:grid-cols-2 sm:p-5">
            <label className="block text-sm font-semibold text-[#193b27]">Your name
              <input value={user.name || ""} readOnly className="mt-2 h-11 w-full cursor-not-allowed rounded-xl border border-[#d9e6dc] bg-[#edf4ef] px-3 font-normal text-[#587060]" />
            </label>
            <label className="block text-sm font-semibold text-[#193b27]">Your email
              <input value={user.email || ""} readOnly className="mt-2 h-11 w-full cursor-not-allowed rounded-xl border border-[#d9e6dc] bg-[#edf4ef] px-3 font-normal text-[#587060]" />
            </label>
            <p className="text-xs text-[#6c8473] sm:col-span-2">Your account details are attached to this book automatically.</p>
          </div>

          {/* Submit the new book */}
          <Button type="submit" disabled={isSaving || !coverUrl} className="h-12 w-full rounded-xl bg-[#068a3f] text-base font-semibold text-white shadow-md shadow-[#068a3f]/15 hover:bg-[#057536] disabled:cursor-not-allowed disabled:opacity-60">
            {isSaving ? <><Spinner className="size-4" /> Adding book...</> : <><BookPlus className="size-4" /> Add Book</>}
          </Button>
        </form>
      </section>
    </main>
  )
}

export default AddBookPage
