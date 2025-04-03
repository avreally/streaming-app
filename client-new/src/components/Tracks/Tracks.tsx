import "./Tracks.css";
import { getTracks } from "../../api/getTracks";
import { useQuery } from "@tanstack/react-query";
import { Track } from "../Track/Track";

export const Tracks = () => {
  const { isLoading, data, error } = useQuery({
    queryKey: ["tracks"],
    queryFn: () => getTracks(),
  });

  // TODO improve loading state
  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (error) return "An error has occurred: " + error.message;

  return (
    <div className="all-tracks">
      <h2>All Tracks</h2>
      <ul className="tracks">
        {data !== undefined
          ? data.map((track) => (
              <Track
                key={track.id}
                id={track.id}
                title={track.title}
                url={track.url}
                artist={track.artist}
              />
            ))
          : null}
      </ul>
    </div>
  );
};
