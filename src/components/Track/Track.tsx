import { useRef, useState } from "react";
import { Button } from "../Button/Button";
import { PlaylistSelector } from "../PlaylistSelector/PlaylistSelector";
import { Modal } from "../Modal/Modal";
import { IconCheck } from "../Icons/IconCheck";
import { postTrack } from "../../api/postTrack";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IconDelete } from "../Icons/IconDelete";
import { DeleteConfirmation } from "../DeleteConfirmation/DeleteConfirmation";
import { deleteTrack } from "../../api/deleteTrack";
import styles from "./Track.module.css";

type TrackProps = {
  id: string;
  title: string;
  url: string;
  artist: string;
  hasAddButton?: boolean;
  includedInPlaylist?: boolean;
  currentPlaylistId?: string;
};

export const Track = ({
  id,
  title,
  url,
  artist,
  hasAddButton,
  includedInPlaylist,
  currentPlaylistId,
}: TrackProps) => {
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [showNotificationAdded, setShowNotificationAdded] = useState(false);
  const [playlistTitle, setPlaylistTitle] = useState("");
  const timeoutIdRef = useRef<number>(undefined);
  const queryClient = useQueryClient();

  const addTrackMutation = useMutation({
    mutationFn: function (currentPlaylistId: string) {
      return postTrack(currentPlaylistId, id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["playlist", currentPlaylistId],
      });
    },
  });

  const deleteTrackMutation = useMutation({
    mutationFn: function (currentPlaylistId: string) {
      return deleteTrack(currentPlaylistId, id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["playlist", currentPlaylistId],
      });
      setShowModalDelete(false);
    },
  });

  function handleAddTrackClick() {
    if (!includedInPlaylist && currentPlaylistId) {
      addTrackMutation.mutate(currentPlaylistId);
    } else {
      setShowModalAdd(true);
    }
  }

  function handleSelectPlaylist(title: string) {
    setShowModalAdd(false);
    setShowNotificationAdded(true);
    timeoutIdRef.current = window.setTimeout(() => {
      setShowNotificationAdded(false);
    }, 2000);
    setPlaylistTitle(title);
  }

  function handleDelete() {
    if (!currentPlaylistId) return;
    deleteTrackMutation.mutate(currentPlaylistId);
  }

  const buttonText = hasAddButton ? "Add" : "Add to playlist...";

  return (
    <li className={styles.track}>
      <div className={styles.wrapper}>
        <audio className={styles.audio} controls src={url}></audio>
        <div className={styles.info}>
          <h4 className={styles.title}>{title}</h4>
          <p className={styles.artist}>{artist}</p>
        </div>
      </div>
      <div className={styles.buttons}>
        <Button onClick={handleAddTrackClick}>{buttonText}</Button>
        {includedInPlaylist && (
          <Button
            variant="danger"
            size="small"
            onClick={() => setShowModalDelete(true)}
          >
            <IconDelete className={styles.delete} />
          </Button>
        )}
      </div>
      {showModalAdd && (
        <Modal
          isShown={showModalAdd}
          onCancel={() => setShowModalAdd(false)}
          variant="playlist-selector"
        >
          <PlaylistSelector trackId={id} onSelect={handleSelectPlaylist} />
        </Modal>
      )}
      {showNotificationAdded && (
        <Modal
          isShown={showNotificationAdded}
          onCancel={() => {
            setShowNotificationAdded(false);
            clearTimeout(timeoutIdRef.current);
          }}
        >
          <div className={styles.container}>
            <IconCheck className={styles.checkmark} />
            Track added to the {playlistTitle} playlist!
          </div>
        </Modal>
      )}
      {showModalDelete && (
        <Modal
          isShown={showModalDelete}
          variant="danger"
          onCancel={() => setShowModalDelete(false)}
        >
          <DeleteConfirmation
            itemType="track"
            itemName={title}
            onConfirm={handleDelete}
            onCancel={() => setShowModalDelete(false)}
          />
        </Modal>
      )}
    </li>
  );
};
