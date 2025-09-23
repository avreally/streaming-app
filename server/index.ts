import express from "express";
import axios from "axios";
import dotenv from "dotenv";
import sessions from "express-session";
import cors from "cors";
import {
  connectToDatabase,
  createNewUser,
  getAllTracks,
  findUserById,
  createNewPlaylist,
  deletePlaylist,
  addTrackToPlaylist,
} from "./services/database.service.js";
import { Playlist } from "./types/playlist.js";

dotenv.config();
const app = express();
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(express.json());

const PORT = 3001;

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const sessionSecret = process.env.SESSIONS_SECRET;

const redirectUri = "http://localhost:3001/oauth-callback";

if (!clientId || !clientSecret) {
  console.error("CLIENT_ID or CLIENT_SECRET env variables are not set");
  process.exit();
}

if (!sessionSecret) {
  console.error("SESSIONS_SECRET env variable is not set");
  process.exit();
}

const oneDay = 1000 * 60 * 60 * 24;
app.use(
  sessions({
    secret: sessionSecret,
    saveUninitialized: true,
    cookie: { maxAge: oneDay, sameSite: false },
    resave: false,
  }),
);

app.get("/signin", (_req, res) => {
  const githubAuthURL = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=user`;
  res.redirect(githubAuthURL);
});

app.get("/oauth-callback", async (req, res) => {
  const { code } = req.query;

  try {
    const tokenResponse = await axios.post(
      "https://github.com/login/oauth/access_token",
      {
        client_id: clientId,
        client_secret: clientSecret,
        code,
        redirect_uri: redirectUri,
      },
      { headers: { Accept: "application/json" } },
    );

    const accessToken = tokenResponse.data.access_token;

    const userResponse = await axios.get("https://api.github.com/user", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    let user = findUserById(userResponse.data.id);

    if (!user) {
      user = await createNewUser(userResponse.data);
    }

    const session = req.session;
    session.userId = String(user.githubUserId);

    res.redirect("http://localhost:5173/");
    res.end();
  } catch {
    res.status(500).json({ error: "Failed to authenticate" });
    res.redirect("http://localhost:5173/login?error=auth_failed");
  }
});

app.get("/me", async (req, res) => {
  if (!req.session.userId) {
    res.status(401).send();
    return;
  }

  const user = await findUserById(Number(req.session.userId));
  if (!user) {
    res.status(404).send();
    return;
  }
  res.send(user);
});

app.get("/signout", (req, res) => {
  req.session.destroy((err) => {
    console.error(err);
    res.clearCookie("connect.sid");
    res.redirect("http://localhost:5173/");
  });
});

app.get("/tracks", async (req, res) => {
  //const query = req.query.query; // req.query.query because query parameter is called "query" in the user search request

  //const search = query ? { title: new RegExp(query as string, "i") } : {}; // conditionally create mongo search
  // object based on request query

  const tracks = getAllTracks();

  res.send(tracks);
});

app.get("/playlists", async (req, res) => {
  if (!req.session.userId) {
    res.status(401).send();
    return;
  }

  const user = await findUserById(Number(req.session.userId));
  if (!user) {
    res.status(404).send();
    return;
  }

  const playlists = user["playlists"];
  res.send(playlists);
});

app.post("/playlists", async (req, res) => {
  if (!req.session.userId) {
    res.status(401).send();
    return;
  }

  const { playlistId, title, playlistTracks }: Playlist = req.body.playlistData;

  const playlist = createNewPlaylist(
    { playlistId, title, playlistTracks },
    Number(req.session.userId),
  );

  res.send(playlist);
});

app.get("/playlists/:id", async (req, res) => {
  if (!req.session.userId) {
    res.status(401).send();
    return;
  }

  const user = await findUserById(Number(req.session.userId));
  if (!user) {
    res.status(404).send();
    return;
  }

  const id = req.params.id;
  const playlist = user.playlists.find((playlist) => {
    return playlist.playlistId === id;
  });

  res.send(playlist);
});

app.post("/playlists/:id", async (req, res) => {
  const id = req.params.id;
  const trackId = req.body.trackId;

  addTrackToPlaylist(id, trackId, Number(req.session.userId));

  res.status(204).end();
});

app.delete("/playlists/:id", async (req, res) => {
  const id = req.params.id;

  deletePlaylist(id, Number(req.session.userId));
  res.status(204).end();
});

connectToDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error: Error) => {
    console.error("Database connection failed", error);
    process.exit();
  });
