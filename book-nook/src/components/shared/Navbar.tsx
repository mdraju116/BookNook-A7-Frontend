
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Menu, X } from "lucide-react";
import UserMenu from "../auth/UserMenu";
import ThemeToggle from "@/components/ThemeToggle";

const navlinks = [
  { label: "Home", link: "/" },
  { label: "Browse books", link: "/books" },
  { label: "My books", link: "/my-books" },
  { label: "My borrows", link: "/my-borrows" },
  { label: "Add Book", link: "/add-book" },
];

// Global navigation: combines route links, theme controls, and the authenticated user menu.
const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (link: string) =>
    link === "/" ? pathname === "/" : pathname === link || pathname.startsWith(`${link}/`);

  return (
    // <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-md">
    <header className="sticky top-0 z-40 border-b border-[#e8e2d6] bg-[#fbf8f1]/95 backdrop-blur-md dark:border-border dark:bg-background/95">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <div className="flex min-h-19 items-center justify-between gap-6">

          <Link href="/" aria-label="BookNook home" className="group flex shrink-0 items-center gap-3">
            <span className="flex size-11 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-sm transition-transform group-hover:-rotate-3">
              <BookOpen size={22} strokeWidth={1.8} />
            </span>

            <span className="leading-tight">
              <span className="block font-serif text-[22px] font-bold tracking-tight text-foreground">
                BookNook
              </span>
              <span className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                A little room to read
              </span>
            </span>
          </Link>

          <nav aria-label="Main navigation" className="hidden items-center gap-1 md:flex">
            {navlinks.map(({ label, link }) => {
              const active = isActive(link);

              return (
                <Link
                  key={link}
                  href={link}
                  aria-current={active ? "page" : undefined}
                  className={`rounded-full px-4 py-2.5 text-md font-bold transition-colors dark:text-white/80 ${active
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-primary"
                    }`}
                >
                  {label}
                </Link>
              );
            })}
          </nav>

          {/* User Area */}
          <div className="hidden shrink-0 items-center gap-3 sm:flex">
            <ThemeToggle />
            <UserMenu />
          </div>

          {/* Hamburger */}
          <button
            type="button"
            className="flex size-11 shrink-0 items-center justify-center rounded-full text-primary transition hover:bg-muted md:hidden"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={23} /> : <Menu size={23} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {menuOpen && (
          <nav
            id="mobile-navigation"
            aria-label="Mobile navigation"
            className="border-t border-border py-3 md:hidden"
          >
            <div className="flex flex-col gap-1">
              {navlinks.map(({ label, link }) => {
                const active = isActive(link);

                return (
                  <Link
                    key={link}
                    href={link}
                    onClick={() => setMenuOpen(false)}
                    aria-current={active ? "page" : undefined}
                    className={`rounded-xl px-4 py-3 text-sm font-semibold transition-colors dark:text-white/80 ${active
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-primary"
                      }`}
                  >
                    {label}
                  </Link>
                );
              })}

              <div className="flex items-center justify-between border-t border-border px-4 pt-3">
                <ThemeToggle onAction={() => setMenuOpen(false)} />
                <UserMenu onAction={() => setMenuOpen(false)} />
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Navbar;
