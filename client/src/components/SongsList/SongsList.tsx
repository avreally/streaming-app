import "./SongsList.css";
import Item from "../Item/Item";
import React, { useContext, useEffect } from "react";
import SongsListContext from "../../contexts/SongsListContext";
import axios from "axios";
// import FavouriteItem from "../FavouriteItem/FavouriteItem";

type SongsListProps = {
  // itemsData: ItemType[];
  baseUrl: string;
};

const SongsList = ({ baseUrl }: SongsListProps) => {
  const [songs, setSongs] = useContext(SongsListContext);

  useEffect(() => {
    axios.get(`${baseUrl}/items`).then((response) => {
      setSongs(response.data);
    });
  }, []);

  return (
    <div className="SongsListWrapper">
      <h2>All music:</h2>
      {songs !== undefined ? (
        <div className="SongsListContainer">
          {songs.map((item) => (
            <Item
              key={item._id}
              title={item.title}
              url={item.url}
              artist={item.artist}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default SongsList;
