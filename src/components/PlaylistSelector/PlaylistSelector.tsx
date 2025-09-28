import { useQuery } from "@tanstack/react-query";
import { Button } from "../Button/Button";
import { getPlaylists } from "../../api/getPlaylists";
import { postTrack } from "../../api/postTrack";
import styles from "./PlaylistSelector.module.css";

type PlaylistSelectorProps = {
  onSelect: (playlistId: string) => void;
  trackId: string;
};

export const PlaylistSelector = ({
  onSelect,
  trackId,
}: PlaylistSelectorProps) => {
  const { data: playlists } = useQuery({
    queryKey: ["playlists"],
    queryFn: () => getPlaylists(),
  });

  function addToPlaylist(
    playlistId: string,
    trackId: string,
    playlistTitle: string,
  ) {
    if (trackId) {
      postTrack(playlistId, trackId);
      onSelect(playlistTitle);
    }
  }

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>Add to playlist:</h3>
      <div className={styles.selector}>
        {playlists ? (
          playlists.map((playlist) => {
            const isAdded = playlist.playlistTracks.includes(trackId);
            return (
              <Button
                variant="tertiary"
                className={styles.option}
                onClick={() =>
                  addToPlaylist(playlist.playlistId, trackId, playlist.title)
                }
                key={playlist.playlistId}
                disabled={isAdded}
              >
                <div className={styles.playlistTitle}>{playlist.title}</div>
                {isAdded && <div>Added!</div>}
              </Button>
            );
          })
        ) : (
          <div className={styles.empty}>No playlists, create one</div>
        )}
      </div>
    </div>
  );
};
