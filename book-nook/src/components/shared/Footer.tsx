import Link from "next/link";
import {  BookOpen,  Mail, MapPin } from "lucide-react";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaInstagramSquare } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#263b30] text-[#f8f5ec]">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-5 sm:px-8 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr] lg:gap-16 lg:py-12">
        <div>
          <Link href="/" aria-label="BookNook home" className="inline-flex items-center gap-3">
            <span className="flex size-11 items-center justify-center rounded-2xl bg-[#f8f5ec] text-[#315b45]">
              <BookOpen size={22} strokeWidth={1.8} />
            </span>
            <span className="font-serif text-2xl font-bold tracking-tight">BookNook</span>
          </Link>
          <p className="mt-5 max-w-sm text-sm leading-6 text-[#d2d9cf]">
            A little room to read. Discover your favorite stories, <br/> and make every book feel at home.
          </p>
          <li className="mt-4 flex items-center gap-3"><MapPin size={17} className="shrink-0 text-[#e4c99b]" /><span>Open to readers everywhere</span></li>
          
        </div>


         <div>
          <h2 className="text-sm font-bold uppercase tracking-[0.16em] text-[#e4c99b]">Explore</h2>
          <ul className="mt-5 space-y-3 text-sm text-[#d2d9cf]">
            <li><Link className="transition hover:text-white" href="/all-books">Browse books</Link></li>
            <li><Link className="transition hover:text-white" href="/my-books">My books</Link></li>
            <li><Link className="transition hover:text-white" href="/add-book">Share a book</Link></li>
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-bold uppercase tracking-[0.16em] text-[#e4c99b]">Get in touch</h2>
          <ul className="mt-5 space-y-4 text-sm text-[#d2d9cf]">
            <li className="flex items-center gap-3"><Mail size={17} className="shrink-0 text-[#e4c99b]" /><a className="transition hover:text-white" href="mailto:hello@booknook.com">hello@booknook.com</a></li>
            
          </ul>
          <div className="mt-6 flex items-center gap-3">
            <a href="https://www.facebook.com/" target="_blank" rel="noreferrer" aria-label="Facebook" className="flex size-10 items-center justify-center rounded-full border border-white/20 text-[#f8f5ec] transition duration-200 hover:-translate-y-1 hover:border-[#e4c99b] hover:bg-white/10 hover:text-[#e4c99b] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#e4c99b]">
               
               <FaFacebookSquare size={18}/>
            </a>
            <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" aria-label="Instagram" className="flex size-10 items-center justify-center rounded-full border border-white/20 text-[#f8f5ec] transition duration-200 hover:-translate-y-1 hover:border-[#e4c99b] hover:bg-white/10 hover:text-[#e4c99b] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#e4c99b]">
              <FaInstagramSquare size={18} />
            </a>
            <a href="https://x.com/" target="_blank" rel="noreferrer" aria-label="X (Twitter)" className="flex size-10 items-center justify-center rounded-full border border-white/20 text-[#f8f5ec] transition duration-200 hover:-translate-y-1 hover:border-[#e4c99b] hover:bg-white/10 hover:text-[#e4c99b] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#e4c99b]">
              <FaSquareXTwitter size={18} />
            </a>
          </div>
        </div>


       

      </div>

      <div className="border-t border-white/15">
        <p className="mx-auto max-w-7xl px-4 py-5 text-center text-xs text-[#c4cec3] sm:px-8 ">
          © {new Date().getFullYear()} BookNook. Made for the love of reading.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
