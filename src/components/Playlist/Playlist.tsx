import { useQuery } from "@tanstack/react-query";
import { getPlaylists } from "../../api/getPlaylists";
import { Loader } from "../Loader/Loader";
import { Track } from "../Track/Track";
import { useNavigate } from "@tanstack/react-router";
import { Button } from "../Button/Button";
import { useState } from "react";
import Modal from "../Modal/Modal";
import { TrackType } from "../../types/types";
import { getTracks } from "../../api/getTracks";
import { deletePlaylist } from "../../api/deletePlaylist";
import styles from "./Playlist.module.css";

type PlaylistProps = {
  playlistId: string;
};

export const Playlist = ({ playlistId }: PlaylistProps) => {
  const {
    isLoading,
    data: playlists,
    error,
    isSuccess,
  } = useQuery({
    queryKey: ["playlists"],
    queryFn: () => getPlaylists(),
  });

  const { data: tracks } = useQuery({
    queryKey: ["tracks"],
    queryFn: () => getTracks(),
  });

  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  if (isLoading) {
    return <Loader />;
  }

  if (!isSuccess) {
    return null;
  }

  const playlist = playlists.find((playlist) => {
    return playlist.playlistId === playlistId;
  });

  if (!playlist) {
    return <div>Playlist doesn&apos;t exist</div>;
  }

  const playlistTrackIds = playlist.playlistTracks;

  const playlistTracks: TrackType[] = [];

  playlistTrackIds.map((trackId: string) => {
    for (let i = 0; playlistTrackIds.length > i; i++) {
      return tracks.filter((track: TrackType) => {
        if (track.id === trackId) {
          playlistTracks.push(track);
        }
      });
    }
  });

  function handleDelete() {
    deletePlaylist(playlist.playlistId);
    setShowModal(false);
    navigate({ to: "/playlists" });
  }

  return (
    <div className={styles.container}>
      <div className={styles.playlistInfo}>
        <img
          className={styles.cover}
          src={`https://picsum.photos/seed/${playlist.playlistId}/200`}
          alt="playlist"
        />
        <div className={styles.wrapper}>
          <h2 className={styles.name}>{playlist.title}</h2>
          <Button
            onClick={() => setShowModal(true)}
            variant="danger"
            className={styles.deletePlaylistButton}
          >
            Delete Playlist
          </Button>
        </div>
      </div>
      <div className={styles.tracksWrapper}>
        {playlistTrackIds.length === 0 ? (
          <div>No tracks here yet 🎧</div>
        ) : null}
        {isLoading ? (
          <Loader />
        ) : playlistTracks !== undefined ? (
          playlistTracks.map((track: TrackType) => (
            <Track
              key={track.id}
              id={track.id}
              title={track.title}
              url={track.url}
              artist={track.artist}
            />
          ))
        ) : null}
      </div>
      {showModal && (
        <Modal
          itemType="playlist"
          itemName={playlist.title}
          onConfirm={handleDelete}
          onCancel={() => setShowModal(false)}
          isShown={showModal}
        />
      )}
    </div>
  );
};
