import { useState } from "react";
import { Button } from "../Button/Button";
import Modal from "../Modal/Modal";
import PlaylistSelector from "../PlaylistSelector/PlaylistSelector";
import { IconCheck } from "../Icons/IconCheck";
import { postTrack } from "../../api/postTrack";
import { useMutation, useQueryClient } from "@tanstack/react-query";
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
  const [showModal, setShowModal] = useState(false);
  const [isPlaylistSelected, setIsPlaylistSelected] = useState(false);
  const [playlistTitle, setPlaylistTitle] = useState("");
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: function (currentPlaylistId: string) {
      return postTrack(currentPlaylistId, id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["playlist", currentPlaylistId],
      });
    },
  });

  function handleClick() {
    if (!includedInPlaylist && currentPlaylistId) {
      mutation.mutate(currentPlaylistId);
    } else {
      setShowModal(true);
    }
  }

  function handleSelectPlaylist(title: string) {
    setShowModal(false);
    setIsPlaylistSelected(true);
    setPlaylistTitle(title);
  }

  const buttonText = hasAddButton ? "Add" : "Add to playlist...";

  return (
    <li className={styles.track}>
      <div className={styles.wrapper}>
        <audio className={styles.audio} controls src={url}></audio>
        <div className={styles.info}>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.artist}>{artist}</p>
        </div>
      </div>
      <Button onClick={handleClick}>{buttonText}</Button>
      {showModal && (
        <Modal
          isShown={showModal}
          onCancel={() => setShowModal(false)}
          variant="playlist-selector"
        >
          <PlaylistSelector trackId={id} onSelect={handleSelectPlaylist} />
        </Modal>
      )}
      {isPlaylistSelected && (
        <Modal
          isShown={isPlaylistSelected}
          onCancel={() => setIsPlaylistSelected(false)}
        >
          <div className={styles.container}>
            <IconCheck className={styles.checkmark} />
            Track added to the {playlistTitle} playlist!
          </div>
        </Modal>
      )}
    </li>
  );
};
