import Link from "next/link"
import { BookOpen, House, Search } from "lucide-react"

export default function NotFoundPage() {
  return (
    <main className="relative flex min-h-[calc(100dvh-9rem)] items-center overflow-hidden bg-[#fffaf8] px-4 py-8 sm:px-8 sm:py-10">
      <div className="pointer-events-none absolute -top-24 -right-24 size-64 rounded-full bg-[#f9e3df] blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-24 size-72 rounded-full bg-[#f7e9df] blur-3xl" />

      <section className="relative mx-auto w-full max-w-2xl text-center" aria-labelledby="not-found-title">
        <div className="mx-auto flex size-20 items-center justify-center rounded-[1.6rem] bg-[#315b45] text-[#fffaf0] shadow-xl shadow-[#315b45]/20 sm:size-24">
          <BookOpen size={45} strokeWidth={1.8} aria-hidden="true" />
        </div>

        <p className="mt-5 font-serif text-6xl font-bold tracking-tight text-[#c45a50] sm:text-8xl">404</p>
        <h1 id="not-found-title" className="mt-1 font-serif text-2xl font-bold tracking-tight text-[#7f3935] sm:text-4xl">
          This page went off the shelf.
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-[#806c68] sm:text-base">
          We couldn&apos;t find the page or book you were looking for. Let&apos;s get you back to a good story.
        </p>

        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#a94d45] px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-[#a94d45]/15 transition hover:-translate-y-0.5 hover:bg-[#873d38] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#a94d45]"
          >
            <House size={17} aria-hidden="true" />
            Back home
          </Link>
          <Link
            href="/books"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-[#e4c4be] bg-white px-5 py-2.5 text-sm font-bold text-[#a94d45] shadow-sm transition hover:-translate-y-0.5 hover:bg-[#fff1ef] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#a94d45]"
          >
            <Search size={17} aria-hidden="true" />
            Browse books
          </Link>
        </div>
      </section>
    </main>
  )
}
