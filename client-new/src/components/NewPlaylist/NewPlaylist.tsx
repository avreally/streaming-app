import { useContext, useEffect, useRef, useState } from "react";
import { ulid } from "ulid";
import clsx from "clsx";
import { Button } from "../Button/Button";
import { IconPlus } from "../Icons/IconPlus";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postPlaylist } from "../../api/postPlaylist";
import { UserContext } from "../../contexts";
import styles from "./NewPlaylist.module.css";
import { PlaylistType } from "../../types/types";

export const NewPlaylist = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isSubmitButtonDisabled, setIsSubmitButtonDisabled] = useState(true);
  const [playlistName, setPlaylistName] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (isFormVisible) {
      inputRef.current?.focus();
    }
  }, [isFormVisible]);

  useEffect(() => {
    setIsSubmitButtonDisabled(playlistName.trim() === "");
  }, [playlistName]);

  function createPlaylist(playlistName: string): PlaylistType {
    return {
      playlistId: ulid(),
      title: playlistName,
      playlistTracks: [],
    };
  }

  function handleInput(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    setPlaylistName(value);
  }

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: function (event: React.FormEvent<HTMLFormElement>) {
      event.preventDefault();

      const newPlaylist = createPlaylist(playlistName.trim());

      setIsFormVisible(false);
      setPlaylistName("");

      // TODO fix this warning
      return postPlaylist(newPlaylist, user.githubUserId);
      // ?? add to local storage
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["playlists"] });
    },
  });

  function handleCancel() {
    setIsFormVisible(false);
    setPlaylistName("");
  }

  return (
    <div className={styles.wrapper}>
      <Button
        onClick={() => setIsFormVisible(true)}
        className={clsx(styles.createButton, {
          [styles.invisible]: isFormVisible,
          [styles.visible]: !isFormVisible,
        })}
        size="fullWidth"
      >
        Create New Playlist
      </Button>
      {mutation.isSuccess ? (
        <div>Created!</div>
      ) : (
        <form
          className={clsx(styles.form, {
            [styles.visible]: isFormVisible,
            [styles.invisible]: !isFormVisible,
          })}
          onSubmit={mutation.mutate}
        >
          <input
            ref={inputRef}
            className={styles.input}
            id="playlistName"
            type="text"
            name="playlistName"
            onChange={handleInput}
            value={playlistName}
          />
          <div className={styles.buttons}>
            <Button
              type="submit"
              variant="primary"
              disabled={isSubmitButtonDisabled}
              className={styles.submitButton}
            >
              Create
            </Button>
            <Button
              onClick={handleCancel}
              type="button"
              variant="tertiary"
              className={styles.cancelButton}
            >
              <IconPlus className={styles.cancelButtonImage} />
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};
