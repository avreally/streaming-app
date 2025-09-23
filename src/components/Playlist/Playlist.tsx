import { useQuery } from "@tanstack/react-query";
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
import { Tracks } from "../Tracks/Tracks";
import { getPlaylistById } from "../../api/getPlaylistById";
import styles from "./Playlist.module.css";

type PlaylistProps = {
  playlistId: string;
};

export const Playlist = ({ playlistId }: PlaylistProps) => {
  const {
    isLoading: isLoadingPlaylist,
    data: playlist,
    isSuccess: isSuccessPlaylist,
  } = useQuery({
    queryKey: ["playlist", playlistId],
    queryFn: () => getPlaylistById(playlistId),
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

  if (isLoadingPlaylist || isLoadingTracks) {
    return <Loader />;
  }

  if (!isSuccessPlaylist || !isSuccessTracks) {
    return <div>Error loading data.</div>;
  }

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
        {isLoadingPlaylist || isLoadingTracks ? (
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
                includedInPlaylist
              />
            ))}
            {playlistTrackIds.length === 0 ? (
              <>
                <h3 className={styles.recommended}>
                  🎧 No tracks here yet, add something from the list below:
                </h3>
                <div className={styles.tracks}>
                  <Tracks isRecommended currentPlaylistId={playlistId} />
                </div>
              </>
            ) : (
              <>
                <h3 className={styles.recommended}>
                  Other tracks you can add:
                </h3>
                <div className={styles.tracks}>
                  <Tracks isRecommended currentPlaylistId={playlistId} />
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
