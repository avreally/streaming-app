import "../components/Tracks/Tracks.css";
import Track from "../components/Track/Track";
import { useState, useEffect } from "react";
import { createLazyFileRoute } from "@tanstack/react-router";

const baseUrl = "http://localhost:3001";

export const Route = createLazyFileRoute("/tracks")({
  component: Tracks,
});

function Tracks() {
  const [tracks, setTracks] = useState([]);
  async function fetchTracks() {
    // TODO setLoading(true);

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
      <div>
        <button>Sign in with GitHub</button>
      </div>
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
}

export default Tracks;
