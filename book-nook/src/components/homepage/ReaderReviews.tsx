"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Star } from "lucide-react";
import MotionWrapper from "@/components/MotionWrapper";

const reviews = [
  {
    name: "Maya Chen",
    book: "The Midnight Library",
    quote:
      "I found a story that stayed with me long after I turned the last page. The whole experience felt easy and welcoming.",
    initials: "MC",
    color: "bg-[#e9eee7] text-[#068a3f]",
  },
  {
    name: "Omar Farooq",
    book: "The Hobbit",
    quote:
      "BookNook helped me find my next adventure and made sharing books with other readers feel simple.",
    initials: "OF",
    color: "bg-[#f5ead7] text-[#8b6736]",
  },
  {
    name: "Lena Brooks",
    book: "Pride and Prejudice",
    quote:
      "I love discovering a new favorite from someone else's shelf. It makes reading feel like a shared hobby again.",
    initials: "LB",
    color: "bg-[#eee8ed] text-[#76536f]",
  },
  {
    name: "Arif Rahman",
    book: "The House in the Cerulean Sea",
    quote:
      "A lovely place to browse, borrow, and keep track of the books I want to read next.",
    initials: "AR",
    color: "bg-[#e5edf0] text-[#456879]",
  },
  {
    name: "Nadia Ali",
    book: "Pachinko",
    quote:
      "I discovered a book I would have missed otherwise. It was such a pleasure to pass it along when I finished.",
    initials: "NA",
    color: "bg-[#f3e7e2] text-[#8a5948]",
  },
  {
    name: "Ethan Cole",
    book: "Braiding Sweetgrass",
    quote:
      "A thoughtful community and a lovely way to keep my reading list moving. I have already found my next read.",
    initials: "EC",
    color: "bg-[#ecebdc] text-[#626a3b]",
  },
];

export default function ReaderReviews() {
  return (
    <section className="bg-[#fbf8f1]">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-8 sm:py-18">
        {/* Reviews heading */}
        <MotionWrapper>
          <div className="mb-8 flex flex-col items-center text-center sm:mb-10">
            <div className="max-w-2xl">
              <h2 className="font-serif text-3xl font-bold tracking-tight text-[#263b30] dark:text-white sm:text-4xl">
                Reader Reviews
              </h2>

              <p className="mt-3 max-w-xl text-sm leading-6 text-[#68736a] dark:text-muted-foreground sm:text-base">
                A few sample notes about finding and sharing a good book.
              </p>
            </div>
          </div>
        </MotionWrapper>

        {/* Review carousel */}
        <Carousel
          opts={{ align: "start", loop: true }}
          className="relative"
        >
          <CarouselContent className="-ml-4">
            {reviews.map((review, index) => (
              <CarouselItem
                key={review.name}
                className="basis-full pl-4 sm:basis-1/2 lg:basis-1/3"
              >
                <MotionWrapper delay={index * 0.1}>
                  <article className="flex h-full min-h-64 flex-col rounded-2xl border border-[#e9e2d8] bg-white p-6 shadow-sm sm:p-7">
                    {/* Star rating */}
                    <div
                      className="flex gap-1 text-[#c28e3e]"
                      aria-label="5 out of 5 stars"
                    >
                      {Array.from({ length: 5 }, (_, index) => (
                        <Star
                          key={index}
                          size={15}
                          fill="currentColor"
                          strokeWidth={1.5}
                          aria-hidden="true"
                        />
                      ))}
                    </div>

                    {/* Review text */}
                    <blockquote className="mt-5 flex-1 font-serif text-lg leading-7 text-[#34463a]">
                      &quot;{review.quote}&quot;
                    </blockquote>

                    {/* Reviewer information */}
                    <div className="mt-6 flex items-center gap-3 border-t border-[#eee9df] pt-5">
                      <span
                        className={`flex size-10 items-center justify-center rounded-full text-xs font-bold ${review.color}`}
                        aria-hidden="true"
                      >
                        {review.initials}
                      </span>

                      <div>
                        <p className="text-sm font-bold text-[#263b30]">
                          {review.name}
                        </p>

                        <p className="mt-0.5 text-xs text-[#68736a]">
                          Loved &quot;{review.book}&quot;
                        </p>
                      </div>
                    </div>
                  </article>
                </MotionWrapper>
              </CarouselItem>
            ))}
          </CarouselContent>
          {/* Navigation controls below cards */}
          <div className="mt-6 flex items-center justify-between gap-4">
            <CarouselPrevious
              aria-label="Previous review"
              className="static size-10 translate-y-0 rounded-full border-[#d8d2c7] bg-white text-[#068a3f] shadow-md hover:bg-[#068a3f] hover:text-white dark:bg-white"
            />

            <CarouselNext
              aria-label="Next review"
              className="static size-10 translate-y-0 rounded-full border-[#d8d2c7] bg-white text-[#068a3f] shadow-md hover:bg-[#068a3f] hover:text-white dark:bg-white"
            />
          </div>
        </Carousel>



      </div>
    </section>
  );
}