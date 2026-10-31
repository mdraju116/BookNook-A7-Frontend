import Link from "next/link";
import { ArrowRight, BookOpen, Compass, Search, Sparkles } from "lucide-react";

const categories = [
  { name: "Fiction", note: "Stories to get lost in", icon: BookOpen, color: "bg-[#e9eee7] text-[#315b45]" },
  { name: "Fantasy", note: "Worlds beyond the ordinary", icon: Sparkles, color: "bg-[#f5ead7] text-[#8b6736]" },
  { name: "Mystery", note: "One more clue, one more page", icon: Search, color: "bg-[#eee8ed] text-[#76536f]" },
  { name: "Nonfiction", note: "Ideas for curious minds", icon: Compass, color: "bg-[#e5edf0] text-[#456879]" },
];

const ExtraSections = () => (
  <>
    <section className="bg-white ">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-8 sm:py-18">
        <div className="mx-auto mb-9 max-w-2xl text-center sm:mb-11">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#8c7350]">Your next chapter starts here</p>
          <h2 className="font-serif text-3xl font-bold tracking-tight text-[#263b30] sm:text-4xl">How borrowing works</h2>
          <p className="mt-3 text-sm leading-6 text-[#68736a] sm:text-base">A few simple steps take you from browsing the shelves to enjoying your next great read.</p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {[
            { number: "01", title: "Find a book", text: "Browse the collection and choose a story you would love to read." },
            { number: "02", title: "Request to borrow", text: "Open a book’s details and send a borrow request to its owner." },
            { number: "03", title: "Enjoy the read", text: "Keep track of your borrowed books from your personal borrow list." },
          ].map((step) => (
            <article key={step.number} className="rounded-2xl border border-[#e9e2d8] bg-[#fbf8f1] p-6 sm:p-7">
              <span className="flex size-11 items-center justify-center rounded-full bg-[#315b45] font-serif text-lg font-bold text-white">{step.number}</span>
              <h3 className="mt-5 font-serif text-xl font-bold text-[#263b30]">{step.title}</h3>
              <p className="mt-2 text-sm leading-6 text-[#68736a]">{step.text}</p>
            </article>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <Link href="/all-books" className="inline-flex items-center gap-2 text-sm font-bold text-[#315b45] transition hover:gap-3 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#315b45]">
            Start browsing <ArrowRight size={17} />
          </Link>
        </div>
      </div>
    </section>

    <section className="bg-[#f3f0e8] ">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-8 sm:py-18">
        <div className="mb-8 flex flex-col gap-3 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#8c7350]">Find your kind of story</p>
            <h2 className="font-serif text-3xl font-bold tracking-tight text-[#263b30] sm:text-4xl">Browse by mood</h2>
            <p className="mt-3 text-sm leading-6 text-[#68736a] sm:text-base">Pick a shelf and see where the pages take you.</p>
          </div>
          <Link href="/all-books" className="inline-flex items-center gap-2 text-sm font-bold text-[#315b45] transition hover:gap-3 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#315b45]">
            All categories <ArrowRight size={17} />
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map(({ name, note, icon: Icon, color }) => (
            <Link
              key={name}
              href={`/all-books?category=${encodeURIComponent(name)}`}
              className="group flex items-center gap-4 rounded-2xl border border-[#e3ddd2] bg-white p-5 transition hover:-translate-y-1 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#315b45]"
            >
              <span className={`flex size-12 shrink-0 items-center justify-center rounded-xl ${color}`}><Icon size={22} strokeWidth={1.8} /></span>
              <span>
                <span className="block font-serif text-lg font-bold text-[#263b30]">{name}</span>
                <span className="mt-1 block text-xs leading-5 text-[#68736a]">{note}</span>
              </span>
              <ArrowRight size={16} className="ml-auto shrink-0 text-[#899187] transition group-hover:translate-x-1 group-hover:text-[#315b45]" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  </>
);

export default ExtraSections;
