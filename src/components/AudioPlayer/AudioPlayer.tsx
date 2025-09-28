import { useContext } from "react";
import styles from "./AudioPlayer.module.css";
import { UserContext } from "../../contexts";

export const AudioPlayer = ({}) => {
  const { user } = useContext(UserContext);

  return <audio className={styles.audioPlayer} src="" controls></audio>;
};
