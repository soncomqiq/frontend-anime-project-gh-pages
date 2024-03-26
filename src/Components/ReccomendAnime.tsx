import axios from "axios";
import { useEffect, useState } from "react";
import { AnimeRecommed, RecommendData } from "../data/reccomendData";
import { Link } from "react-router-dom";
import { Carousel } from "flowbite-react";

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

        <div className="h-[500px] w-full">
          <Carousel indicators={false}>
            {recAnime.data?.data.map((anime: AnimeRecommed, index: number) => {
              return (
                <Link to={`detail/${anime.entry[0].mal_id}`} key={index}>
                  <div>
                    <img
                      src={anime.entry[0].images.webp.large_image_url}
                      className="block m-auto w-auto h-[400px] rounded-lg object-cover"
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
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default ReccomendAnime;
