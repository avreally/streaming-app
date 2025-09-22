import { useState } from "react";
import { Button } from "../Button/Button";
import Modal from "../Modal/Modal";
import PlaylistSelector from "../PlaylistSelector/PlaylistSelector";
import { IconCheck } from "../Icons/IconCheck";
import styles from "./Track.module.css";

type TrackProps = {
  id: string;
  title: string;
  url: string;
  artist: string;
  hasAddButton?: boolean;
};

export const Track = ({ id, title, url, artist, hasAddButton }: TrackProps) => {
  const [showModal, setShowModal] = useState(false);
  const [isPlaylistSelected, setIsPlaylistSelected] = useState(false);
  const [playlistTitle, setPlaylistTitle] = useState("");

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
      <Button onClick={() => setShowModal(true)}>{buttonText}</Button>
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
