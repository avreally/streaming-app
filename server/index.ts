import express from "express";
import { collections, connectToDatabase } from "./services/database.service";
import { itemsRouter } from "./routes/items.router";
import "dotenv/config";
import axios from "axios";
import User from "./models/user";
import sessions from "express-session";
import { ObjectId } from "mongodb";
import cors from "cors";
import Item from "./models/item";

const app = express();

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

app.use(express.json());

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;

const sessionSecret = process.env.SESSIONS_SECRET;
if (!sessionSecret) {
  console.error("SESSIONS_SECRET env variable is not set");
  process.exit();
}

const PORT = 3001;

const oneDay = 1000 * 60 * 60 * 24;
app.use(
  sessions({
    secret: sessionSecret,
    saveUninitialized: true,
    cookie: { maxAge: oneDay, sameSite: false },
    resave: false,
  })
);

const findUserInMongoDB = async (filter: {}) => {
  const user = await collections.users?.findOne(filter);
  if (user) {
    return user;
  } else {
    return undefined;
  }
};

const createUserInMongoDB = async (userId: number, userName: string) => {
  try {
    const newUser = new User(userId, userName, [], new ObjectId());
    await collections.users?.insertOne(newUser);
    return newUser;
  } catch (err) {
    console.error("Something went wrong creating new user", err.message);
    return undefined;
  }
};

connectToDatabase()
  .then(() => {
    app.use("/items", itemsRouter);

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });

    // app.get("/", async (req, res) => {
    //   const session = req.session;
    //
    //   console.log("session userId", session.userId);
    //
    //   if (session.userId) {
    //     // checking if session exists
    //     const foundUser = await findUserInMongoDB({
    //       _id: new ObjectId(session.userId),
    //     });
    //     console.log("session exists, foundUser is", foundUser);
    //     if (foundUser) {
    //       console.log("user already exists");
    //       // console.log("Existing user is", user);
    //       // console.log("_id is", user._id.toString());
    //       // TODO go to homepage, show userName and logout button
    //       res.redirect("http://localhost:3000/");
    //     }
    //   } else {
    //     res.redirect("http://localhost:3001/login");
    //   }
    // });

    app.get("/login", (_req, res) => {
      res.redirect(
        `https://github.com/login/oauth/authorize?client_id=${clientId}`
      );
    });

    app.get("/oauth-callback", (req, res) => {
      const body = {
        client_id: clientId,
        client_secret: clientSecret,
        code: req.query.code,
      };
      const options = { headers: { accept: "application/json" } };

      axios
        .post(`https://github.com/login/oauth/access_token`, body, options)
        .then((res) => res.data["access_token"])
        .then(async (token) => {
          const { data } = await axios({
            url: "https://api.github.com/user",
            method: "get",
            headers: {
              Authorization: `token ${token}`,
            },
          });

          let foundUser = await findUserInMongoDB({
            githubUserId: data.id,
          });

          if (foundUser === undefined) {
            foundUser = await createUserInMongoDB(data.id, data.name);
          }

          if (foundUser === undefined) {
            return;
          }

          // creating session
          const session = req.session;
          session.userId = foundUser._id.toString();
          console.log("created session for new user", foundUser._id.toString());

          res.redirect("http://localhost:3000/");
          res.end();
        })
        .catch((err) => res.status(500).json({ message: err.message }));
    });

    app.get("/me", async (req, res) => {
      console.log("session id", req.session.userId);
      const foundUser = await findUserInMongoDB({
        _id: new ObjectId(req.session.userId),
      });
      console.log(foundUser);
      if (!foundUser) {
        res.status(401);
        res.end();
        return;
      }
      res.send(foundUser);
    });

    app.get("/logout", (req, res) => {
      req.session.destroy((err: any) => {
        console.log(err);
        res.clearCookie("connect.sid");
        res.redirect("http://localhost:3000/");
      });
      console.log("session id after logout", req.session);
    });

    // Searching for song
    const getUserSearchResult = async (userQuery: string) => {
      try {
        const response = await axios.get(`http://localhost:3001/search`, {
          params: {
            q: userQuery,
          },
        });
        console.log(response.data);
        // return getSongData(response.data.response);
      } catch (err) {
        console.error(err);
      }
    };

    // Selecting specific data from all data about song
    // const getSongData = (allData) => {
    //   const allData = new Item (title, url, artist, id);
    //
    //   // console.log({ title, artist, songId, songImgUrl });
    //   return { title, artist, songId, songImgUrl };
    // };

    app.get("/items/song", async (req, res) => {
      const query = req.query;

      // let filter = {};
      //
      // filter.title = query

      const songs = await collections.items?.find({ title: query }).toArray(); // toArray() is also asynchronous

      // const result = await getUserSearchResult(req.query.search);
      console.log("searching for", req.query.search);
      console.log("songs are", songs);
      res.send(songs);
    });
  })
  .catch((error: Error) => {
    console.error("Database connection failed", error);
    process.exit();
  });
