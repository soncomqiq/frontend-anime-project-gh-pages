import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="flex bg-[#E3E1D9] text-blueGray-600 top-0 p-3 flex-wrap justify-between mb-3 rounded-b-lg sticky z-40 items-center">
      <div className="flex items-center">
        <img
          src="https://www.svgrepo.com/show/171369/japanese-drawing.svg"
          className="w-10 h-10 "
        />
        <h1 className="text-2xl ml-3">Anime.co</h1>
      </div>
      <ul className="flex gap-[40px] text-xl">
        <Link to={`/`}>
          <li className="hover:text-white">home</li>
        </Link>
        <Link to={`/seasons`}>
          <li className="hover:text-white">seasons</li>
        </Link>
        <Link to={`/favorites`}>
          <li className="hover:text-white">favorites</li>
        </Link>
      </ul>
    </div>
  );
};

export default Header;
