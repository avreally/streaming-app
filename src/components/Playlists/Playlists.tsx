import { useQuery } from "@tanstack/react-query";
import { NewPlaylist } from "../NewPlaylist/NewPlaylist";
import { getPlaylists } from "../../api/getPlaylists";
import { Loader } from "../Loader/Loader";
import { PlaylistType } from "../../types/types";
import { Link } from "@tanstack/react-router";
import styles from "./Playlists.module.css";

export const Playlists = () => {
  const {
    isLoading,
    data: playlists,
    error,
  } = useQuery({
    queryKey: ["playlists"],
    queryFn: () => getPlaylists(),
  });

  if (isLoading) {
    return <Loader />;
  }

  // not working?
  if (error) return "An error has occurred: " + error.message;

  return (
    <div className={styles.wrapper}>
      <NewPlaylist />
      <div className={styles.playlists}>
        {playlists !== undefined && playlists !== null
          ? playlists.map((playlist: PlaylistType, index: number) => {
              return (
                <Link
                  className={styles.playlistCard}
                  to={`/playlists/${playlist.playlistId}`}
                  key={playlist.playlistId}
                  data-testid={playlist.playlistId}
                >
                  <img
                    className={styles.playlistCover}
                    loading="lazy"
                    src={`https://picsum.photos/seed/${playlist.playlistId}/200?random=${index}`}
                    alt="Playlist cover"
                  />
                  <div className={styles.name}>{playlist.title}</div>
                </Link>
              );
            })
          : null}
      </div>
    </div>
  );
};
