import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import React, { useState } from "react";
import { ItemType } from "../types";
import SongsListContext from "./contexts/SongsListContext";

const App = () => {
  const songsList = useState<ItemType[]>([]);
  return (
    <React.StrictMode>
      <SongsListContext.Provider value={songsList}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            {/*<Route path="/favourites" element={<ListOfFavourites />} />*/}
          </Routes>
        </BrowserRouter>
      </SongsListContext.Provider>
    </React.StrictMode>
  );
};

export default App;
