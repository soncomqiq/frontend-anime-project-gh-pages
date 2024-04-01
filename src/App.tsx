import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Home from "./home";
import Detail from "./details";
import Seasons from "./seasons";
import Favorites from "./favorites";

const BASE_URL = "/frontend-anime-project-gh-pages/";

function App() {
  const router = createBrowserRouter(
    [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/detail/:mal_id",
        element: <Detail />,
      },
      {
        path: "/seasons",
        element: <Seasons />,
      },
      {
        path: "/favorites",
        element: <Favorites />,
      },
      {
        path: "/favorites/detail/:mal_id",
        element: <Detail />,
      },
      {
        path: "/seasons/detail/:mal_id",
        element: <Detail />,
      },
    ],
    { basename: BASE_URL }
  );
  return <RouterProvider router={router} />;
}

export default App;
