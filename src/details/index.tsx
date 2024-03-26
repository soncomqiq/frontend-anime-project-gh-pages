import { useEffect, useState } from "react";
import Header from "../Components/Header";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AnimeObjData } from "../data/animeArrData";

type animeType = {
  data: AnimeObjData | undefined;
  loading: Boolean;
  error: null;
};

const Detail = () => {
  const { mal_id } = useParams();

  const [anime, setAnime] = useState<animeType>({
    data: undefined,
    loading: true,
    error: null,
  });

  const callData = async (mal_id: string) => {
    try {
      const response = await axios.get(
        `https://api.jikan.moe/v4/anime/${mal_id}/full`
      );
      console.log(response.data);
      setAnime({
        data: response.data,
        loading: true,
        error: null,
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (mal_id) callData(mal_id);
  }, [mal_id]);

  return (
    <div className="bg-[#F2EFE5] min-h-screen m-auto box-border font-mono selection:bg-[#F2EFE5]">
      <Header />
      <div className="container m-auto p-3 h-full">
        <div className="grid grid-cols-[1fr_2fr] grid-rows-[500px_200px] gap-3 bg-[#E3E1D9] p-3 rounded-lg overflow-hidden ">
          <div className="col-span-1 row-span-1">
            <div className="h-full w-full flex items-center bg-[#F2EFE5] p-3 rounded-lg">
              <img
                src={anime.data?.data.images?.webp.large_image_url}
                className="max-h-full w-auto m-auto rounded-lg"
              />
            </div>
          </div>
          <div className="col-span-1 row-span-1">
            <div className="w-full h-full rounded-lg overflow-hidden">
              <h1 className="w-full h-[5%] text-center font-bold text-md">
                Trailer
              </h1>
              <video
                className="w-full h-[95%] rounded-lg overflow-hidden"
                controls
              >
                <source src={anime.data?.data.trailer?.url} type="video/mp4" />
              </video>
            </div>
          </div>
          <div className="col-span-1 row-span-1">
            <div className="flex flex-col gap-1 bg-[#F2EFE5] p-3 rounded-lg h-full">
              <h1 className="text-lg font-bold">
                {anime.data?.data.title} {anime.data?.data.year}
              </h1>
              <h1 className="text-sm">{anime.data?.data.status}</h1>
              <h1 className="text-sm">
                {anime.data?.data.aired.from
                  ? `${anime.data?.data.aired.from.slice(0, 10)} `
                  : "??? "}
                {anime.data?.data.aired.to
                  ? `to ${anime.data?.data.aired.to.slice(0, 10)}`
                  : "to ???"}
              </h1>
              <h1 className="text-sm">{anime.data?.data.rating}</h1>
              <h1 className="text-sm">rank: {anime.data?.data.rank}</h1>
              <h1 className="text-xl">score: {anime.data?.data.score}/10</h1>
            </div>
          </div>
          <div className="col-span-1 row-span-1">
            <div className="bg-[#F2EFE5] p-3 rounded-lg h-full overflow-hidden overflow-y-auto">
              <p>{anime.data?.data.synopsis}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
