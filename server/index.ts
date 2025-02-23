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
} from "./services/database.service.js";

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
  } catch (error) {
    res.status(500).json({ error: "Failed to authenticate" });
    res.redirect("http://localhost:5173/login?error=auth_failed");
  }
});

app.get("/me", async (req, res) => {
  if (!req.session.userId) {
    res.status(401).json({ error: "User not authenticated" });
    return;
  }

  const user = await findUserById(Number(req.session.userId));
  if (!user) {
    res.status(404).json({ error: "User not found" });
    return;
  }
  res.send(user);
});

app.get("/signout", (req, res) => {
  req.session.destroy((err: any) => {
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
