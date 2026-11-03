"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Spinner } from "@/components/ui/spinner";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const slides: { image: string; title: string; description: string; alt: string }[] = [
  {
    image: "https://images.unsplash.com/photo-1585779034823-7e9ac8faec70?auto=format&fit=crop&w=2000&q=85",
    title: "Find your next favorite",
    description: "A new story is waiting around every corner. Find the book that feels made for you.",
    alt: "A cozy reading space filled with books",
  },
  {
    image: "https://images.unsplash.com/photo-1647793294248-4a3187b0d6a6?auto=format&fit=crop&w=2000&q=85",
    title: "A little room to read",
    description: "Make space for fresh ideas, faraway places, and the stories you’ll remember.",
    alt: "Books ready to take you somewhere new",
  },
  {
    image: "https://images.unsplash.com/photo-1735607232119-6e3d4956cacb?auto=format&fit=crop&w=2000&q=85",
    title: "Pass a good story along",
    description: "Explore the shelves, discover something unexpected, and share the joy of reading.",
    alt: "A collection of books to discover",
  },
];

const Banner = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
  <section aria-label="Discover books" aria-busy={isLoading} className="mx-auto max-w-7xl px-4 py-5 sm:px-8 sm:py-8">
    {/* Rotating discovery slides */}
    <Swiper
      modules={[Autoplay, Navigation, Pagination]}
      autoplay={{ delay: 4500, disableOnInteraction: false }}
      navigation
      pagination={{ clickable: true }}
      loop
      slidesPerView={1}
      className="overflow-hidden rounded-3xl"
    >
      {slides.map(({ image, title, description, alt }, index) => (
        <SwiperSlide key={title}>
          {/* Slide image, text overlay, and browse link */}
          <div className="relative flex min-h-97 items-center overflow-hidden sm:min-h-115">
            {isLoading && index === 0 && (
              <div className="absolute inset-0 z-20 flex items-center justify-center bg-[#17281f]/45">
                <Spinner className="size-10 text-white" label="Loading banner" />
              </div>
            )}
            <Image src={image} alt={alt} fill priority={index === 0} className="object-cover" sizes="(max-width: 1280px) 100vw, 1280px" onLoad={index === 0 ? () => setIsLoading(false) : undefined} onError={index === 0 ? () => setIsLoading(false) : undefined} />
            
            <div className="absolute inset-0 bg-linear-to-r from-[#17281f]/85 via-[#17281f]/55 to-transparent" />
            
            <div className="relative z-10 max-w-2xl px-16 py-14 text-white sm:px-24 sm:py-20">
              
              <h1 className="max-w-xl font-serif text-4xl font-bold leading-tight tracking-tight sm:text-4xl md:text-4.5xl">{title}</h1>
              <p className="mt-5 max-w-lg text-base leading-7 text-white/90 sm:text-lg">{description}</p>
              <Link
                href="/all-books"
                className="mt-8 inline-flex items-center rounded-full bg-[#068a3f] px-6 py-3 text-sm font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-[#057536]  focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                Browse Books
              </Link>
            </div>

          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  </section>
  );
};

export default Banner;
