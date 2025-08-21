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
import DeleteConfirmation from "../DeleteConfirmation/DeleteConfirmation";
import styles from "./Playlist.module.css";
import { Tracks } from "../Tracks/Tracks";

type PlaylistProps = {
  playlistId: string;
};

export const Playlist = ({ playlistId }: PlaylistProps) => {
  const {
    isLoading: isLoadingPlaylists,
    data: playlists,
    isSuccess: isSuccessPlaylists,
  } = useQuery({
    queryKey: ["playlists"],
    queryFn: () => getPlaylists(),
  });

  const {
    isLoading: isLoadingTracks,
    data: tracks,
    isSuccess: isSuccessTracks,
  } = useQuery({
    queryKey: ["tracks"],
    queryFn: () => getTracks(),
  });

  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  if (isLoadingPlaylists || isLoadingTracks) {
    return <Loader />;
  }

  if (!isSuccessPlaylists || !isSuccessTracks) {
    return <div>Error loading data.</div>;
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
    if (!playlist) return;
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
        {isLoadingPlaylists || isLoadingTracks ? (
          <Loader />
        ) : playlistTracks !== undefined ? (
          <>
            {playlistTracks.map((track) => (
              <Track
                key={track.id}
                id={track.id}
                title={track.title}
                url={track.url}
                artist={track.artist}
              />
            ))}
            {playlistTrackIds.length === 0 ? (
              <>
                <h3 className={styles.recommended}>
                  🎧 No tracks here yet, add something from the list below:
                </h3>
                <div className={styles.tracks}>
                  <Tracks isRecommended />
                </div>
              </>
            ) : (
              <>
                <h3 className={styles.recommended}>
                  Other tracks you can add:
                </h3>
                <div className={styles.tracks}>
                  <Tracks isRecommended />
                </div>
              </>
            )}
          </>
        ) : null}
      </div>
      {showModal && (
        <Modal
          isShown={showModal}
          variant="danger"
          onCancel={() => setShowModal(false)}
        >
          <DeleteConfirmation
            itemType="playlist"
            itemName={playlist.title}
            onConfirm={handleDelete}
            onCancel={() => setShowModal(false)}
          />
        </Modal>
      )}
    </div>
  );
};
