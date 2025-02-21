import "./Track.css";

type TrackProps = {
  id: number;
  title: string;
  url: string;
  artist: string;
};

const Track = ({ title, url, artist }: TrackProps) => {
  return (
    <li className="track">
      <h3>{title}</h3>
      <p>{artist}</p>
      <audio className="audio" controls src={url}></audio>
    </li>
  );
};

export default Track;
