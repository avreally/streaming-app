import "./Track.css";

type TrackProps = {
  id: number;
  title: string;
  url: string;
  artist: string;
};

export const Track = ({ title, url, artist }: TrackProps) => {
  return (
    <li className="track">
      <audio className="audio" controls src={url}></audio>
      <div className="track-info">
        <h3 className="title">{title}</h3>
        <p className="artist">{artist}</p>
      </div>
    </li>
  );
};
