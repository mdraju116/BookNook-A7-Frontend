import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";

type DemoBook = {
  id: string;
  title: string;
  titleLines: string[];
  author: string;
  category: string;
  addedAt: string;
  colors: { background: string; accent: string; text: string };
};

const demoBooks: DemoBook[] = [
  {
    id: "midnight-library",
    title: "The Midnight Library",
    titleLines: ["The Midnight", "Library"],
    author: "Matt Haig",
    category: "Fiction",
    addedAt: "2026-10-29",
    colors: { background: "#173c45", accent: "#e7bd75", text: "#fff4d9" },
  },
  {
    id: "house-cerulean-sea",
    title: "The House in the Cerulean Sea",
    titleLines: ["The House in", "the Cerulean", "Sea"],
    author: "TJ Klune",
    category: "Fantasy",
    addedAt: "2026-10-26",
    colors: { background: "#d77d58", accent: "#f4d59d", text: "#fff8e9" },
  },
  {
    id: "klara-and-the-sun",
    title: "Klara and the Sun",
    titleLines: ["Klara and", "the Sun"],
    author: "Kazuo Ishiguro",
    category: "Literary Fiction",
    addedAt: "2026-10-23",
    colors: { background: "#d1a844", accent: "#fff0c1", text: "#493d24" },
  },
  {
    id: "pachinko",
    title: "Pachinko",
    titleLines: ["Pachinko"],
    author: "Min Jin Lee",
    category: "Historical Fiction",
    addedAt: "2026-10-20",
    colors: { background: "#385c49", accent: "#d9bb81", text: "#fff8e9" },
  },
  {
    id: "braiding-sweetgrass",
    title: "Braiding Sweetgrass",
    titleLines: ["Braiding", "Sweetgrass"],
    author: "Robin Wall Kimmerer",
    category: "Nature",
    addedAt: "2026-10-17",
    colors: { background: "#77907a", accent: "#eee0b9", text: "#fffdf2" },
  },
  {
    id: "ocean-at-the-end",
    title: "The Ocean at the End of the Lane",
    titleLines: ["The Ocean", "at the End", "of the Lane"],
    author: "Neil Gaiman",
    category: "Fantasy",
    addedAt: "2026-10-14",
    colors: { background: "#39466c", accent: "#e5c588", text: "#fff9e9" },
  },
];

const newestBooks = [...demoBooks]
  .sort((first, second) => Date.parse(second.addedAt) - Date.parse(first.addedAt))
  .slice(0, 6);

function DemoBookCover({ book }: { book: DemoBook }) {
  return (
    <svg
      aria-label={`Cover art for ${book.title}`}
      className="h-full w-full"
      role="img"
      viewBox="0 0 300 390"
      preserveAspectRatio="xMidYMid slice"
    >
      <rect width="300" height="390" fill={book.colors.background} />
      <path d="M0 292C76 242 142 346 300 260V390H0Z" fill={book.colors.accent} opacity=".2" />
      <circle cx="236" cy="72" r="39" fill={book.colors.accent} opacity=".9" />
      <circle cx="236" cy="72" r="53" fill="none" stroke={book.colors.accent} strokeOpacity=".45" strokeWidth="2" />
      <path d="M26 25H274V365H26Z" fill="none" stroke={book.colors.accent} strokeOpacity=".6" strokeWidth="2" />
      <path d="M38 37H262V353H38Z" fill="none" stroke={book.colors.accent} strokeOpacity=".28" />
      <text x="48" y="102" fill={book.colors.accent} fontFamily="Georgia,serif" fontSize="12" letterSpacing="4">BOOKNOOK EDITION</text>
      <text x="48" y={book.titleLines.length === 1 ? 190 : 164} fill={book.colors.text} fontFamily="Georgia,serif" fontSize="29" fontWeight="bold">
        {book.titleLines.map((line, index) => (
          <tspan key={line} x="48" dy={index === 0 ? 0 : 38}>{line}</tspan>
        ))}
      </text>
      <path d="M48 282H112" stroke={book.colors.accent} strokeWidth="3" />
      <text x="48" y="322" fill={book.colors.text} fontFamily="Arial,sans-serif" fontSize="13" letterSpacing="2">{book.author.toUpperCase()}</text>
    </svg>
  );
}

export default function NewArrivals() {
  return (
    <section className="bg-[#fbf8f1] ">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-8 sm:py-18">
        <div className="mb-8 flex flex-col gap-3 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#8c7350]">Fresh on the shelves</p>
            <h2 className="font-serif text-3xl font-bold tracking-tight text-[#263b30] sm:text-4xl">New Arrivals</h2>
            <p className="mt-3 max-w-xl text-sm leading-6 text-[#68736a] sm:text-base">
              Take a look at the latest stories to find their way into BookNook.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:gap-7">
          {newestBooks.map((book) => (
            <article key={book.id} className="group overflow-hidden rounded-2xl border border-[#e9e2d8] bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg">
              <div className="relative aspect-4/3 overflow-hidden bg-[#eee9df]">
                <DemoBookCover book={book} />
                <span className="absolute left-4 top-4 rounded-full bg-[#fffdf9]/95 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[#315b45]">New</span>
              </div>
              <div className="p-5 sm:p-6">
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#8c7350]">{book.category}</p>
                <h3 className="font-serif text-xl font-bold leading-snug text-[#263b30]">{book.title}</h3>
                <p className="mt-2 text-sm text-[#68736a]">by {book.author}</p>
                <Link
                  href={`/all-books?book=${book.id}`}
                  className="mt-5 inline-flex items-center gap-2 rounded-full border border-[#315b45] px-4 py-2.5 text-sm font-semibold text-[#315b45] transition hover:bg-[#315b45] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#315b45]"
                >
                  <BookOpen size={16} />
                  View Details
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-9 flex justify-center sm:mt-11">
          <Link
            href="/all-books"
            className="inline-flex items-center gap-2 rounded-full bg-[#315b45] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#263b30] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#315b45]"
          >
            See All Books
            <ArrowRight size={17} />
          </Link>
        </div>
      </div>
    </section>
  );
}
