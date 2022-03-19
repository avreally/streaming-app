import "./ListOfFavourites.css";
import FavouriteItem from "../FavouriteItem/FavouriteItem";

type ListOfFavouritesProps = {
  className: string;
};

const ListOfFavourites = ({ className }: ListOfFavouritesProps) => {
  return (
    <div>
      <h2>List of Favourites:</h2>
      <FavouriteItem className={className} />
      <FavouriteItem className={className} />
    </div>
  );
};

export default ListOfFavourites;
