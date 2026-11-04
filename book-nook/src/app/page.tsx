import Banner from "@/components/homepage/Banner";
import NewArrivals from "@/components/homepage/NewArrivals";
import ExtraSections from "@/components/homepage/HowToBorrow";
import ReaderReviews from "@/components/homepage/ReaderReviews";

export default function Home() {
  return (
    <div className="homepage-shell">
       {/* Hero carousel */}
       <Banner />
       {/* Latest books from the library API */}
       <NewArrivals />
       {/* Guide to borrowing books */}
       <ExtraSections />
       {/* Reader review carousel */}
       <ReaderReviews />
    </div>
  );
}
