import "./AllTracks.css";
import Track from "../Track/Track";
import { useEffect, useState } from "react";
const baseUrl = "http://localhost:3001";

const AllTracks = () => {
  const [tracks, setTracks] = useState([]);
  async function fetchTracks() {
    // setLoading(true);

    await fetch(`${baseUrl}/tracks`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setTracks(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  useEffect(() => {
    fetchTracks();
  }, []);

  return (
    <div className="all-tracks">
      <h2>All Tracks</h2>
      <ul className="tracks">
        {tracks !== undefined
          ? tracks.map((track) => (
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

export default AllTracks;
