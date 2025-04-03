import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import React, { useState } from "react";
import { ItemType } from "../types";
import SongsListContext from "./contexts/SongsListContext";
import ListOfFavourites from "./components/ListOfFavourites/ListOfFavourites";
import SongsList from "./components/SongsList/SongsList";

const App = () => {
  const songsList = useState<ItemType[]>([]);
  const baseUrl = "http://localhost:3001";

  return (
    <React.StrictMode>
      <SongsListContext.Provider value={songsList}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home baseUrl={baseUrl} />}>
              <Route path="favourites" element={<ListOfFavourites />} />
              <Route
                path="all-music"
                element={<SongsList baseUrl={baseUrl} />}
              />
            </Route>
          </Routes>
        </BrowserRouter>
      </SongsListContext.Provider>
    </React.StrictMode>
  );
};

export default App;
