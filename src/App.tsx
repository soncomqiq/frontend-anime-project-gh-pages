import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Home from "./home";
import Detail from "./details";
import Seasons from "./seasons";
import Favorites from "./favorites";

const BASE_URL = "/frontend-anime-project-gh-pages";

function App() {
  const router = createBrowserRouter(
    [
      {
        path: BASE_URL + "/",
        element: <Home />,
      },
      {
        path: BASE_URL + "/detail/:mal_id",
        element: <Detail />,
      },
      {
        path: BASE_URL + "/seasons",
        element: <Seasons />,
      },
      {
        path: BASE_URL + "/favorites",
        element: <Favorites />,
      },
      {
        path: BASE_URL + "/favorites/detail/:mal_id",
        element: <Detail />,
      },
      {
        path: BASE_URL + "/seasons/detail/:mal_id",
        element: <Detail />,
      },
    ],
    { basename: BASE_URL }
  );
  return <RouterProvider router={router} />;
}

export default App;
