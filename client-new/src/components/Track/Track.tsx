import styles from "./Track.module.css";

type TrackProps = {
  id: number;
  title: string;
  url: string;
  artist: string;
};

export const Track = ({ title, url, artist }: TrackProps) => {
  return (
    <li className={styles.track}>
      <audio className={styles.audio} controls src={url}></audio>
      <div className={styles.info}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.artist}>{artist}</p>
      </div>
    </li>
  );
};
