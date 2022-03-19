import "./FavouriteItem.css";

type FavouriteItemProps = {
  className: string;
};

const FavouriteItem = ({ className }: FavouriteItemProps) => {
  return <div className={className}>Favourite Item</div>;
};

export default FavouriteItem;
