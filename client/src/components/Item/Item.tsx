import "./Item.css";
import Button from "../Button/Button";

type ItemProps = {
  className: string;
  key: string;
  title: string;
};

const Item = ({ className, title }: ItemProps) => {
  return (
    <div className="itemCard">
      <div>{title} </div>
      <Button className="addToFavouriteButton" buttonName="☆" />
    </div>
  );
};

export default Item;
