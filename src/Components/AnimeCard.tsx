import { Link } from "react-router-dom";
import { AnimeData } from "../data/animeArrData";
import { useState } from "react";

interface AnimeCardProps {
  anime: AnimeData;
  saved: boolean;
}

export function AnimeCard({ anime, saved }: AnimeCardProps) {
  const [isSaved, setIsSaved] = useState(saved);

  return (
    <div className="w-[250px] col-span-2 lg:col-span-1 mx-auto relative">
      <button
        onClick={() => {
          if (isSaved) {
            localStorage.removeItem(anime.title);
          } else {
            localStorage.setItem(anime.title, JSON.stringify(anime));
          }
          setIsSaved((preIsSave) => !preIsSave);
          console.log(localStorage);
        }}
        className="absolute right-0 px-2 m-1 shadow-xl rounded-lg border-2 border-[#F2EFE5] bg-[#E3E1D9] hover:bg-[#F2EFE5] focus:outline-none focus:ring focus:ring-[#B4B4B8]"
      >
        {isSaved ? "Saved" : "Save"}
      </button>

      <Link to={`detail/${anime.mal_id}`}>
        <div className="h-[300px] ">
          <img
            src={anime.images.webp.large_image_url}
            alt=""
            className="h-full w-full m-auto object-cover rounded-t-lg"
          />
        </div>
        <div className="p-2 w-full text-center bg-white rounded-b-lg shadow-lg">
          <h1 className="text-sm text-[#B4B4B8] self-center">
            {`${anime.title}`}
          </h1>
        </div>
      </Link>
    </div>
  );
}
