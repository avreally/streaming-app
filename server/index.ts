import express from "express";
import { collections, connectToDatabase } from "./services/database.service";
import { itemsRouter } from "./routes/items.router";
import "dotenv/config";
import axios from "axios";
import User from "./models/user";
import sessions from "express-session";
import cookieParser from "cookie-parser";
import { ObjectId } from "mongodb";
import cors from "cors";

const app = express();

app.use(cors());

app.use(express.json());
app.use(cookieParser());

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
    // res.sendStatus(404);
  }
};

connectToDatabase()
  .then(() => {
    app.use("/items", itemsRouter);

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });

    app.get("/", async (req, res) => {
      const session = req.session;

      console.log("session userId", session.userId);

      if (session.userId) {
        // checking if session exists, endpoint #1
        const foundUser = await findUserInMongoDB({
          _id: new ObjectId(session.userId),
        });
        console.log("session exists, foundUser is", foundUser);
        if (foundUser) {
          console.log("user already exists");
          // console.log("Existing user is", user);
          // console.log("_id is", user._id.toString());
          // TODO go to homepage, show userName and logout button
          res.redirect("http://localhost:3000/");
        }
      } else {
        res.redirect("http://localhost:3000/login");
      }
    });

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

          // creating session, endpoint #2
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
      res.send(foundUser);
    });
  })
  .catch((error: Error) => {
    console.error("Database connection failed", error);
    process.exit();
  });
