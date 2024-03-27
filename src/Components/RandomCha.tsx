import axios from "axios";
import { FormEvent, useEffect, useState } from "react";
import { CharacterData } from "../data/characterData";
import ReactLoading from "react-loading";

type characterType = {
  data: CharacterData | undefined;
  loading: Boolean;
  error: null | any;
};

const RandomCha = () => {
  const [ranCha, setRanCha] = useState<characterType>({
    data: undefined,
    loading: true,
    error: null,
  });

  const [value, setValue] = useState("");
  const [ans, setAns] = useState("");

  async function getRanCha() {
    setRanCha({ data: undefined, loading: true, error: null });
    try {
      const response = await axios.get(
        `https://api.jikan.moe/v4/random/characters`
      );
      // console.log(response.data);
      if (response.data.data.rating == "Rx - Hentai") {
        setRanCha({
          data: undefined,
          loading: false,
          error: null,
        });
      } else {
        setRanCha({
          data: response.data,
          loading: false,
          error: null,
        });
        setAns(response.data.data.name);
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getRanCha();
    return () => {};
  }, []);

  function handleSubmit(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    console.log(value);
    console.log(ans);
    if (value.toLocaleLowerCase() == ans.toLocaleLowerCase()) {
      alert(`Correct!!!, It's ${ans.toLocaleLowerCase()}`);
    } else {
      alert(`Nice try!!, It's ${ans.toLocaleLowerCase()}`);
    }
    setValue("");
  }

  return (
    <div className="text-blueGray-600 rounded-lg overflow-hidden text-blueGray-600 h-full bg-[#E3E1D9]">
      <div className="grid grid-rows-2 h-[20%]">
        <div className="p-3 w-full flex justify-center items-center gap-3">
          <h1 className="text-xl">mini game</h1>
          <img
            src="https://www.svgrepo.com/show/516580/games-2.svg"
            alt=""
            className="w-7 h-7"
          />
        </div>
        <div className="m-auto">
          <button
            className="h-10 min-w-[8rem] shadow-xl rounded-lg border-2 border-[#F2EFE5] bg-[#E3E1D9] hover:bg-[#F2EFE5] focus:outline-none focus:ring focus:ring-[#B4B4B8]"
            onClick={getRanCha}
          >
            Random
          </button>
        </div>
      </div>

      <div className="p-3 h-[80%]">
        <div className="h-[80%]">
          {ranCha.loading && (
            <div className="h-full flex justify-center items-center">
              <ReactLoading type="spin" color="#fff" />
            </div>
          )}

          {!ranCha.loading && (
            <img
              src={ranCha.data?.data.images.webp.image_url}
              alt=""
              className="h-full w-auto rounded-md m-auto shadow-xl"
            />
          )}
        </div>
        <form
          onSubmit={handleSubmit}
          className="h-[20%] flex gap-3 items-center mt-3"
        >
          <input
            className="h-10 ml-3 min-w-[12rem] shadow-xl rounded-lg indent-3 focus:outline-none focus:ring focus:ring-[#B4B4B8]"
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="character's name"
          />

          <button className="h-10 min-w-[8rem] shadow-xl rounded-lg border-2 border-[#F2EFE5] bg-[#E3E1D9] hover:bg-[#F2EFE5] focus:outline-none focus:ring focus:ring-[#B4B4B8]">
            Answer
          </button>
        </form>
      </div>
    </div>
  );
};

export default RandomCha;
