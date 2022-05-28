import "./AllItems.css";
import Item from "../Item/Item";
import React, { useContext, useEffect } from "react";
import SongsListContext from "../../contexts/SongsListContext";
import axios from "axios";
// import FavouriteItem from "../FavouriteItem/FavouriteItem";

type AllItemsProps = {
  // itemsData: ItemType[];
  baseUrl: string;
};

const AllItems = ({ baseUrl }: AllItemsProps) => {
  const [itemsData, setItemsData] = useContext(SongsListContext);

  useEffect(() => {
    axios.get(`${baseUrl}/items`).then((response) => {
      setItemsData(response.data);
    });
  }, []);

  return (
    <div className="allSongsWrapper">
      <h2>All music:</h2>
      {itemsData !== undefined ? (
        <div className="allSongsContainer">
          {itemsData.map((item) => (
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

export default AllItems;
