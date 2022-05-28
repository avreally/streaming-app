import "./AllItems.css";
import Item from "../Item/Item";
import { ItemType } from "../../../types";
import React from "react";
// import FavouriteItem from "../FavouriteItem/FavouriteItem";

type AllItemsProps = {
  itemsData: ItemType[];
};

const AllItems = ({ itemsData }: AllItemsProps) => {
  return (
    <div className="allSongsWrapper">
      <h2>All music:</h2>
      {itemsData !== undefined ? (
        <div className="allSongsContainer">
          {itemsData.map((item) => (
            <Item
              key={item._id}
              title={item.title}
              // className="allItems"
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
