import Banner from "@/components/homepage/Banner";
import NewArrivals from "@/components/homepage/NewArrivals";
import HowToBorrow from "@/components/homepage/HowToBorrow";
import ReaderReviews from "@/components/homepage/ReaderReviews";
import TopCategories from "@/components/homepage/TopCategories";


export default function Home() {
  return (
    <div className="homepage-shell">
       {/* Hero carousel */}
       <Banner />
       {/* Latest books from the library API */}
       <NewArrivals />

       <TopCategories/>
       {/* Guide to borrowing books */}
       <HowToBorrow />
       {/* Reader review carousel */}
       <ReaderReviews />
    </div>
  );
}
