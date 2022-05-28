import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import React, { useState } from "react";
import { ItemType } from "../types";
import SongsListContext from "./contexts/SongsListContext";
import ListOfFavourites from "./components/ListOfFavourites/ListOfFavourites";
import AllItems from "./components/AllItems/AllItems";

const App = () => {
  const songsList = useState<ItemType[]>([]);
  return (
    <React.StrictMode>
      <SongsListContext.Provider value={songsList}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />}>
              <Route path="favourites" element={<ListOfFavourites />} />
              <Route
                path="all-music"
                element={<AllItems itemsData={songsList[0]} />}
              />
            </Route>
            {/*<Route path="/favourites" element={<ListOfFavourites />} />*/}
          </Routes>
        </BrowserRouter>
      </SongsListContext.Provider>
    </React.StrictMode>
  );
};

export default App;
