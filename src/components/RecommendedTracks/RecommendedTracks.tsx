import { TrackType } from "../../types/types";
import { Track } from "../Track/Track";
import styles from "./RecommendedTracks.module.css";

type RecommendedTracksProps = {
  recommendedTracks: TrackType[];
  currentPlaylistId: string;
};

export const RecommendedTracks = ({
  recommendedTracks,
  currentPlaylistId,
}: RecommendedTracksProps) => {
  return (
    <div>
      <h3 className={styles.recommended}>Other tracks you can add:</h3>
      {recommendedTracks.map((track) => (
        <Track
          key={track.id}
          id={track.id}
          title={track.title}
          url={track.url}
          artist={track.artist}
          hasAddButton
          currentPlaylistId={currentPlaylistId}
        />
      ))}
    </div>
  );
};
