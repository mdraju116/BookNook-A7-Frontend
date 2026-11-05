"use client";

import { useMemo, useState } from "react";
import { ArrowLeft, BookOpen, ChevronDown } from "lucide-react";
import Link from "next/link";
import type { Book } from "@/types/book";
import BookCard from "@/components/books/BookCard";
import MotionWrapper from "@/components/MotionWrapper";

type Props = {
    books: Book[] | null;
};

export default function AllBooksCatalog({ books }: Props) {
    const [selectedCategory, setSelectedCategory] = useState("all");

    const categories = useMemo(() => {
        if (!books) return [];

        return [...new Set(books.map((book) => book.category))].sort();
    }, [books]);

    const filteredBooks = useMemo(() => {
        if (!books) return [];

        if (selectedCategory === "all") return books;

        return books.filter(
            (book) => book.category === selectedCategory
        );
    }, [books, selectedCategory]);

    return (
        <>
            <MotionWrapper>
                <header className="mb-10 border-b border-[#e8e5dc] pb-8">
                    {/* Heading */}
                    <div className="text-center">
                        <h1 className="page-heading font-serif text-4xl font-bold tracking-tight text-[#263b30] dark:text-white sm:text-5xl">
                            Browse all books
                        </h1>

                        <p className="page-subheading mx-auto mt-3 max-w-xl text-base leading-7 text-[#687168] dark:text-white">
                            Find your next good read, from much-loved classics to new discoveries.
                        </p>
                    </div>

                    {/* Navigation and Category Filter */}
                    <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 rounded-full border border-[#d8ded5] bg-white px-4 py-2.5 text-sm font-semibold text-[#068a3f] shadow-sm transition hover:bg-[#f1f5ef] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#068a3f]"
                        >
                            <ArrowLeft size={17} /> Back to Home
                        </Link>

                        {books && (
                            <div className="flex flex-wrap items-center gap-3">
                                {/* Category Dropdown */}
                                <div className="relative">
                                    <select
                                        value={selectedCategory}
                                        onChange={(e) => setSelectedCategory(e.target.value)}
                                        className="appearance-none rounded-xl border border-[#d8ded5] bg-white py-2.5 pl-4 pr-10 text-sm font-semibold text-[#263b30] shadow-sm outline-none focus:border-[#068a3f] dark:border-[#068a3f] dark:bg-white dark:text-[#068a3f]"
                                    >
                                        <option value="all">All Categories</option>

                                        {categories.map((category) => (
                                            <option key={category} value={category}>
                                                {category}
                                            </option>
                                        ))}
                                    </select>

                                    <ChevronDown
                                        size={16}
                                        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#068a3f]"
                                    />
                                </div>

                                {/* Book Count */}
                                <span className="inline-flex rounded-full bg-[#e8eee7] px-3 py-2.5 text-sm font-semibold text-[#068a3f]">
                                    {filteredBooks.length}{" "}
                                    {filteredBooks.length === 1 ? "book" : "books"}
                                </span>
                            </div>
                        )}
                    </div>
                </header>
            </MotionWrapper>

            {/* Book Display */}
            {books === null ? (
                <div className="rounded-3xl border border-[#e8e5dc] bg-white px-6 py-16 text-center">
                    <BookOpen className="mx-auto mb-4 text-[#78907d]" size={34} />

                    <h2 className="font-serif text-2xl font-bold text-[#263b30] dark:text-white">
                        The library is taking a moment
                    </h2>

                    <p className="mt-2 text-[#687168]">
                        We couldn’t load the books right now. Please refresh the page to try again.
                    </p>
                </div>
            ) : books.length === 0 ? (
                <div className="rounded-3xl border border-[#e8e5dc] bg-white px-6 py-16 text-center">
                    <BookOpen className="mx-auto mb-4 text-[#78907d]" size={34} />

                    <h2 className="font-serif text-2xl font-bold text-[#263b30] dark:text-white">
                        A little room for the first story
                    </h2>

                    <p className="mt-2 text-[#687168]">
                        There are no books here yet. Check back soon for something to read.
                    </p>
                </div>
            ) : filteredBooks.length === 0 ? (
                <p className="py-16 text-center text-muted-foreground">
                    No books found in this category.
                </p>
            ) : (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredBooks.map((book, index) => (
                        <MotionWrapper key={book._id} delay={index * 0.08}>
                            <BookCard book={book} isNew />
                        </MotionWrapper>
                    ))}
                </div>
            )}
        </>
    );
}