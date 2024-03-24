import { Link } from "react-router-dom";
import Header from "../Components/Header";
import { AnimeData } from "../data/animeArrData";
import { useEffect, useState } from "react";

const Favorites = () => {
  const [favObj, setFavobj] = useState([]);

  function getFavObj() {
    let arr: any = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key != null) {
        const item = localStorage.getItem(key);
        if (item != null) {
          arr.push(JSON.parse(item));
        }
      }
    }
    setFavobj(arr);
  }

  console.log(favObj);

  useEffect(() => {
    getFavObj();
  }, []);

  return (
    <div className="bg-[#F2EFE5] min-h-screen m-auto box-border font-mono selection:bg-[#F2EFE5]">
      <Header />
      <div className="container m-auto w-full p-3 bg-[#E3E1D9] rounded-lg overflow-hidden">
        <div className="w-full flex justify-center items-center mb-3">
          <h1 className="text-xl">My favorites</h1>
        </div>
        <div className="grid grid-cols-4 gap-3">
          {favObj.map((anime: AnimeData, index: number) => {
            return (
              <div
                key={index}
                className="w-[220px] col-span-1 rounded-lg overflow-hidden m-auto relative"
              >
                <button
                  onClick={() => {
                    localStorage.removeItem(anime.title);
                    getFavObj();
                  }}
                  className="absolute right-0 px-2 m-1 shadow-xl rounded-lg border-2 border-[#F2EFE5] bg-[#E3E1D9] hover:bg-[#F2EFE5] focus:outline-none focus:ring focus:ring-[#B4B4B8]"
                >
                  remove
                </button>
                <Link to={`detail/${anime.mal_id}`}>
                  <img
                    src={anime.images.webp.large_image_url}
                    alt=""
                    className="h-[300px] w-full m-auto object-cover rounded-t-lg"
                  />
                  <div className="p-2 w-full text-center bg-white shadow-lg rounded-b-lg">
                    <h1 className="text-sm text-[#B4B4B8] self-center">
                      {`${anime.title}`}
                    </h1>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Favorites;
