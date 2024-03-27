import axios from "axios";
import React, { useEffect, useState } from "react";
import { AnimeData } from "../data/animeArrData";
import { AnimeArrData } from "../data/animeArrData";
import ReactLoading from "react-loading";
import { AnimeCard } from "./AnimeCard";

type searchType = {
  data: AnimeArrData | undefined;
  loading: Boolean;
  error: null | any;
};

const SearchAnime = () => {
  const [value, setValue] = useState("");
  const [anime, setAnime] = useState<searchType>({
    data: undefined,
    loading: true,
    error: null,
  });

  async function getAnime(name: string) {
    try {
      const response = await axios.get(
        `https://api.jikan.moe/v4/anime?q=${name}`
      );
      // console.log(response.data);
      setAnime({
        data: response.data,
        loading: false,
        error: null,
      });
    } catch (error) {
      setAnime({
        data: undefined,
        loading: false,
        error: Response.error,
      });
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setAnime({ data: undefined, loading: true, error: null });
    getAnime(value);
    setValue("");
  }

  useEffect(() => {
    getAnime("");
  }, []);

  // console.log("res", anime);

  return (
    <div className="rounded-lg overflow-hidden h-[1700px] text-blueGray-600 bg-[#E3E1D9]">
      <div className="grid grid-cols-3 bg-[#E3E1D9]">
        <div className="col-span-1 col-start-2">
          <div className="p-3 w-full flex justify-center items-center gap-3">
            <h1 className="text-xl">search your anime</h1>
            <img
              src="https://www.svgrepo.com/show/532552/search-alt-2.svg"
              alt=""
              className="w-7 h-7"
            />
          </div>
        </div>
        <div className="col-span-1 flex gap-3 items-center">
          <form onSubmit={handleSubmit}>
            <div className="flex gap-3">
              <input
                className="h-10 ml-3 min-w-[12rem] shadow-xl rounded-lg indent-3 focus:outline-none focus:ring focus:ring-[#B4B4B8]"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                type="text"
                placeholder="Search Anime"
              />

              <button className="h-10 min-w-[8rem] shadow-xl rounded-lg border-2 border-[#F2EFE5] bg-[#E3E1D9] hover:bg-[#F2EFE5] focus:outline-none focus:ring focus:ring-[#B4B4B8]">
                Search
              </button>
            </div>
          </form>
        </div>
      </div>

      {anime.loading && (
        <div className="h-screen flex justify-center items-center">
          <ReactLoading type="spin" color="#fff" />
        </div>
      )}

      {!anime.loading && (
        <div className="h-full grid grid-cols-4 text-center p-3 gap-2 overflow-y-auto">
          {anime.data?.data.map((anime: AnimeData, index: number) => {
            return (
              <AnimeCard
                saved={Boolean(localStorage.getItem(anime.title))}
                anime={anime}
                key={index}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SearchAnime;
