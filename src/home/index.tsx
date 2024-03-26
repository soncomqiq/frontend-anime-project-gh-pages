import SearchAnime from "../Components/SearchAnime";
import RandomAnime from "../Components/RandomAnime";
import RandomCha from "../Components/RandomCha";
import ReccomendAnime from "../Components/ReccomendAnime";
import Footer from "../Components/Footer";
import Header from "../Components/Header";

export default function Home() {
  return (
    <div className="bg-[#F2EFE5] min-h-screen m-auto box-border font-mono selection:bg-[#F2EFE5]">
      <Header />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 container m-auto grid-rows-3">
        <div className="col-span-1 row-span-1 row-start-2 lg:row-start-1">
          <ReccomendAnime />
        </div>
        <div className="col-span-3 row-span-1 lg:row-span-3 lg:col-span-3 row-start-1 col-start-1 lg:col-start-2">
          <SearchAnime />
        </div>
        <div className="col-span-1 row-start-2 bg-[#E3E1D9] lg:row-start-2 rounded-lg overflow-hidden">
          <RandomAnime />
        </div>
        <div className="col-span-1 row-start-3 bg-[#E3E1D9] rounded-lg overflow-hidden">
          <RandomCha />
        </div>
      </div>

      <Footer />
    </div>
  );
}
