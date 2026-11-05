import { NextResponse } from "next/server"
import { auth, db } from "@/lib/auth"

const categories = ["Fiction", "Science", "History", "Kids", "Others"]

// Server-side book creation endpoint: authenticates the reader and validates every field.
export async function POST(request: Request) {
  try {
    const session = await auth.api.getSession({ headers: request.headers })
    if (!session?.user) {
      return NextResponse.json({ error: "Please sign in to add a book." }, { status: 401 })
    }

    const body: unknown = await request.json()
    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Enter the book details and try again." }, { status: 400 })
    }

    const { title, author, category, description, image } = body as Record<string, unknown>
    if (
      typeof title !== "string" || !title.trim() || title.trim().length > 160 ||
      typeof author !== "string" || !author.trim() || author.trim().length > 120 ||
      typeof category !== "string" || !categories.includes(category) ||
      typeof description !== "string" || description.trim().length < 10 || description.trim().length > 1200 ||
      typeof image !== "string" || !image.startsWith("https://") || image.length > 2048
    ) {
      return NextResponse.json({ error: "Check the book details and try again." }, { status: 400 })
    }

    const book = {
      title: title.trim(),
      author: author.trim(),
      category,
      description: description.trim(),
      image,
      addedAt: new Date(),
      addedBy: {
        userId: session.user.id,
        name: session.user.name || "BookNook reader",
        email: session.user.email,
      },
    }

    const result = await db.collection("books").insertOne(book)
    return NextResponse.json({ id: result.insertedId.toString() }, { status: 201 })
  } catch (error) {
    console.error("Add book error:", error)
    return NextResponse.json({ error: "Could not save the book. Please try again." }, { status: 500 })
  }
}
