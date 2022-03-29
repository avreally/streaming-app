import "./AllItems.css";
import Item from "../Item/Item";
import { ItemType } from "../../../types";
// import FavouriteItem from "../FavouriteItem/FavouriteItem";

type AllItemsProps = {
  className: string;
  itemsData: ItemType[];
};

const AllItems = ({ className, itemsData }: AllItemsProps) => {
  return (
    <div className="allSongsWrapper">
      <h2>All songs:</h2>
      <div className="allSongsContainer">
        {itemsData.map((item) => (
          <Item
            key={item._id}
            title={item.title}
            className={className}
            url={item.url}
            artist={item.artist}
          />
        ))}
      </div>
    </div>
  );
};

export default AllItems;
