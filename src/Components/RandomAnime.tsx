import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AnimeObjData } from "../data/animeArrData";
import ReactLoading from "react-loading";

type randomType = {
  data: AnimeObjData | undefined;
  loading: Boolean;
  error: null | any;
};

const RandomAnime = () => {
  const [ranAnime, setRanAnime] = useState<randomType>({
    data: undefined,
    loading: true,
    error: null,
  });

  async function getRanAnime() {
    setRanAnime({ data: undefined, loading: true, error: null });
    try {
      const response = await axios.get(`https://api.jikan.moe/v4/random/anime`);
      // console.log(response.data);
      if (response.data.data.rating == "Rx - Hentai") {
        setRanAnime({
          data: undefined,
          loading: false,
          error: null,
        });
      } else {
        setRanAnime({
          data: response.data,
          loading: false,
          error: null,
        });
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getRanAnime();
    return () => {};
  }, []);
  return (
    <div className="bg-[#E3E1D9] rounded-lg overflow-hidden text-blueGray-600 h-full">
      <div className="grid grid-rows-2 h-[20%]">
        <div className="p-3 bg-[#E3E1D9] flex justify-center items-center gap-2">
          <h1 className="text-xl">random anime</h1>
          <img
            src="https://www.svgrepo.com/show/488669/random.svg"
            alt=""
            className="w-7 h-7"
          />
        </div>
        <div className="m-auto">
          <button
            className="h-10 min-w-[8rem] shadow-xl rounded-lg border-2 border-[#F2EFE5] bg-[#E3E1D9] hover:bg-[#F2EFE5] focus:outline-none focus:ring focus:ring-[#B4B4B8]"
            onClick={getRanAnime}
          >
            Random
          </button>
        </div>
      </div>

      {ranAnime.loading && (
        <div className="h-[300px] flex justify-center items-center">
          <ReactLoading type="spin" color="#fff" />
        </div>
      )}

      {!ranAnime.loading && (
        <div className="h-full w-[250px] p-3 m-auto">
          <Link to={`detail/${ranAnime.data?.data.mal_id}`}>
            <div>
              <div className="h-[300px]">
                <img
                  src={ranAnime.data?.data.images?.webp.large_image_url}
                  alt=""
                  className="h-full w-full m-auto object-cover rounded-t-lg"
                />
              </div>
              <div className="p-2 w-full text-center bg-white rounded-b-lg shadow-lg">
                <h1 className="text-sm text-[#B4B4B8] self-center">
                  {`${ranAnime.data?.data.title}`}
                </h1>
              </div>
            </div>
          </Link>
        </div>
      )}
    </div>
  );
};

export default RandomAnime;
