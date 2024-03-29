import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import axios from "axios";
import { AnimeArrData } from "../data/animeArrData";
import { AnimeData } from "../data/animeArrData";
import ReactLoading from "react-loading";
import { AnimeCard } from "../Components/AnimeCard";

type SeasonType = {
  data: AnimeArrData | undefined;
  loading: Boolean;
  error: null | any;
};

const Seasons = () => {
  const [value, setValue] = useState<string>("");
  const [select, setSelect] = useState<string>("");
  const [season, setSeason] = useState<SeasonType>({
    data: undefined,
    loading: true,
    error: null,
  });

  async function getSeason(year?: string, season?: string) {
    try {
      if (year && season) {
        const response = await axios.get(
          `https://api.jikan.moe/v4/seasons/${year}/${season}`
        );
        // console.log(response.data);
        setSeason({
          data: response.data,
          loading: false,
          error: null,
        });
      } else if (!year && !season) {
        const response = await axios.get(
          `https://api.jikan.moe/v4/seasons/now`
        );
        // console.log(response.data);
        setSeason({
          data: response.data,
          loading: false,
          error: null,
        });
      } else {
        alert("please complete all required fields");
        setSeason({
          data: undefined,
          loading: false,
          error: null,
        });
      }
    } catch (error) {
      setSeason({
        data: undefined,
        loading: false,
        error: Response.error,
      });
    }
  }

  async function getUpcoming() {
    try {
      const response = await axios.get(
        `https://api.jikan.moe/v4/seasons/upcoming`
      );
      console.log(response.data);
      setSeason({
        data: response.data,
        loading: false,
        error: null,
      });
    } catch (error) {
      setSeason({
        data: undefined,
        loading: false,
        error: Response.error,
      });
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log(value);
    console.log(select);
    setSeason({ data: undefined, loading: true, error: null });
    getSeason(value, select);
  }

  useEffect(() => {
    getSeason();
    return () => {};
  }, []);

  return (
    <div className="bg-[#F2EFE5] min-h-screen m-auto box-border font-mono selection:bg-[#F2EFE5]">
      <Header />
      <div className="container m-auto w-full p-3 bg-[#E3E1D9] rounded-lg overflow-hidden">
        <div className="flex flex-col gap-3">
          <div className="flex justify-center gap-3">
            <form onSubmit={handleSubmit}>
              <div className="flex gap-3">
                <select
                  id="countries"
                  className="h-10 min-w-[15rem] shadow-xl rounded-lg indent-3 focus:outline-none focus:ring focus:ring-[#B4B4B8]"
                  onChange={(e) => setSelect(e.target.value)}
                >
                  <option value={""}>Season</option>
                  <option value="winter">Winter</option>
                  <option value="spring">Spring</option>
                  <option value="summer">Summer</option>
                  <option value="fall">Fall</option>
                </select>
                <input
                  className="h-10 min-w-[12rem] shadow-xl rounded-lg indent-3 focus:outline-none focus:ring focus:ring-[#B4B4B8]"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  type="text"
                  placeholder="year in A.D."
                />

                <button className="h-10 min-w-[8rem] shadow-xl rounded-lg border-2 border-[#F2EFE5] bg-[#E3E1D9] hover:bg-[#F2EFE5] focus:outline-none focus:ring focus:ring-[#B4B4B8]">
                  Search
                </button>
              </div>
            </form>
            <div>
              <button
                className="h-10 min-w-[8rem] shadow-xl rounded-lg border-2 border-[#F2EFE5] bg-[#E3E1D9] hover:bg-[#F2EFE5] focus:outline-none focus:ring focus:ring-[#B4B4B8]"
                onClick={() => {
                  setSeason({ data: undefined, loading: true, error: null });
                  getUpcoming();
                }}
              >
                UPCOMING !!
              </button>
            </div>
          </div>

          {season.loading && (
            <div className="h-screen flex justify-center items-center">
              <ReactLoading type="spin" color="#fff" />
            </div>
          )}

          {!season.loading && (
            <div className="grid grid-cols-4 gap-3">
              {season.data?.data?.map((anime: AnimeData, index: number) => {
                // console.log(anime);
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
      </div>
    </div>
  );
};

export default Seasons;
