import { getTracks } from "../../api/getTracks";
import { useQuery } from "@tanstack/react-query";
import { Track } from "../Track/Track";
import { TrackType } from "../../types/types";
import { Loader } from "../Loader/Loader";
import styles from "./Tracks.module.css";

export const Tracks = () => {
  const {
    isLoading,
    data: tracks,
    error,
  } = useQuery({
    queryKey: ["tracks"],
    queryFn: () => getTracks(),
  });

  if (isLoading) {
    return <Loader />;
  }

  if (error) return "An error has occurred: " + error.message;

  return (
    <div className={styles.wrapper}>
      <ul className={styles.tracks}>
        {tracks !== undefined
          ? tracks.map((track: TrackType) => (
              <Track
                key={track.id}
                id={track.id}
                title={track.title}
                url={track.url}
                artist={track.artist}
              />
            ))
          : null}
      </ul>
    </div>
  );
};
