import Banner from "@/components/homepage/Banner";
import NewArrivals from "@/components/homepage/NewArrivals";
import ExtraSections from "@/components/homepage/HowToBorrow";

export default function Home() {
  return (
    <div >
       <Banner />
       <NewArrivals/>
       <ExtraSections />
    </div>
  );
}
