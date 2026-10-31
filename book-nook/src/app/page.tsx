import Banner from "@/components/homepage/Banner";
import NewArrivals from "@/components/homepage/NewArrivals";
import ExtraSections from "@/components/homepage/HowToBorrow";
import ReaderReviews from "@/components/homepage/ReaderReviews";

export default function Home() {
  return (
    <div >
       <Banner />
       <NewArrivals/> 
       <ExtraSections />
       <ReaderReviews />
    </div>
  );
}
