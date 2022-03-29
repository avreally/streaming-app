import "./Item.css";
import Button from "../Button/Button";

type ItemProps = {
  className: string;
  key: string;
  title: string;
  url: string;
  artist: string;
};

const Item = ({ className, title, url, artist }: ItemProps) => {
  return (
    <div className="itemCard">
      <div>{title}</div>
      <div>{artist}</div>
      <div className="audioContainer">
        <audio controls src={`${url}`}></audio>
        <Button className="addToFavouriteButton" buttonName="☆" />
      </div>
    </div>
  );
};

export default Item;
