import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"

export async function POST(request: Request) {
  try {
    const session = await auth.api.getSession({ headers: request.headers })
    if (!session?.user) {
      return NextResponse.json({ error: "Please sign in to upload a cover image." }, { status: 401 })
    }

    const apiKey = process.env.IMGBB_API_KEY
    if (!apiKey) {
      return NextResponse.json({ error: "Image uploads are not configured yet. Set IMGBB_API_KEY in the server environment." }, { status: 503 })
    }

    const incoming = await request.formData()
    const image = incoming.get("image")
    if (!(image instanceof File) || !image.type.startsWith("image/") || image.size === 0 || image.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: "Choose an image file up to 5 MB." }, { status: 400 })
    }

    const payload = new FormData()
    payload.set("image", image)
    const uploadResponse = await fetch(`https://api.imgbb.com/1/upload?key=${encodeURIComponent(apiKey)}`, {
      method: "POST",
      body: payload,
    })
    const result = await uploadResponse.json()
    if (!uploadResponse.ok || !result?.success || typeof result?.data?.url !== "string") {
      console.error("ImgBB upload failed:", result?.error?.message || uploadResponse.statusText)
      return NextResponse.json({ error: "The image host could not upload this cover. Please try again." }, { status: 502 })
    }

    return NextResponse.json({ url: result.data.url })
  } catch (error) {
    console.error("Book cover upload error:", error)
    return NextResponse.json({ error: "Could not upload the cover image. Please try again." }, { status: 500 })
  }
}
