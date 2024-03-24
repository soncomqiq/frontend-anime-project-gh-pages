import axios from "axios";
import { useEffect, useState } from "react";
import { AnimeRecommed, RecommendData } from "../data/reccomendData";
import "flowbite";
import { Link } from "react-router-dom";

type recommendType = {
  data: RecommendData | undefined;
  loading: Boolean;
  error: null | any;
};

const ReccomendAnime = () => {
  const [recAnime, setRecAnime] = useState<recommendType>({
    data: undefined,
    loading: true,
    error: null,
  });

  async function getRecAnime() {
    try {
      const response = await axios.get(
        `https://api.jikan.moe/v4/recommendations/anime`
      );
      setRecAnime({
        data: response.data,
        loading: false,
        error: null,
      });
    } catch (error) {
      setRecAnime({
        data: undefined,
        loading: false,
        error: Response.error,
      });
    }
  }

  useEffect(() => {
    getRecAnime();
  }, []);

  console.log("rec", recAnime);

  return (
    <div>
      <div className="w-full bg-[#E3E1D9] rounded-lg overflow-hidden text-blueGray-600 m-auto h-[550px]">
        <div className="p-3 w-full text-center bg-[#E3E1D9]">
          <h1 className="text-xl">
            Anime Reccomendations{" "}
            <img
              src="https://www.svgrepo.com/show/506715/fire.svg"
              className="w-5 h-5 inline-block"
            />
            <img
              src="https://www.svgrepo.com/show/506715/fire.svg"
              className="w-5 h-5 inline-block"
            />
            <img
              src="https://www.svgrepo.com/show/506715/fire.svg"
              className="w-5 h-5 inline-block"
            />
          </h1>
        </div>

        <div
          id="default-carousel"
          className="relative w-full h-[500px]"
          data-carousel="slide"
        >
          <div className="relative overflow-hidden h-full">
            {recAnime.data?.data.map((anime: AnimeRecommed, index: number) => {
              return (
                <Link to={`detail/${anime.entry[0].mal_id}`} key={index}>
                  <div
                    className="hidden duration-700 ease-in-out"
                    data-carousel-item
                  >
                    {" "}
                    <img
                      src={anime.entry[0].images.webp.large_image_url}
                      className="block m-auto w-auto h-[440px] rounded-lg object-cover"
                      alt="..."
                    />
                    <div className="p-2 w-full h-[50px] text-center bg-[#E3E1D9] rounded-b-lg">
                      <h1 className="text-md text-[#B4B4B8] self-center">
                        {`${anime.entry[0].title}`}
                      </h1>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          <button
            type="button"
            className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
            data-carousel-prev
          >
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
              <svg
                className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 1 1 5l4 4"
                />
              </svg>
              <span className="sr-only">Previous</span>
            </span>
          </button>
          <button
            type="button"
            className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
            data-carousel-next
          >
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
              <svg
                className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 9 4-4-4-4"
                />
              </svg>
              <span className="sr-only">Next</span>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReccomendAnime;
