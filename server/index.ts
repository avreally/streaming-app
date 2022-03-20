import express from "express";
import { collections, connectToDatabase } from "./services/database.service";
import { itemsRouter } from "./routes/items.router";
import "dotenv/config";
import axios from "axios";
import User from "./models/user";
import sessions from "express-session";
import cookieParser from "cookie-parser";

const app = express();

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
    cookie: { maxAge: oneDay },
    resave: false,
  })
);

const checkUserInMongoDB = async (filter: {}) => {
  const user = await collections.users?.findOne(filter);
  if (user) {
    console.log("user already exists");
    console.log(user);
    return user;
  } else {
    return undefined;
  }
};

const createUserInMongoDB = async (userId: number, userName: string) => {
  try {
    const newUser = new User(userId, userName, []);
    await collections.users?.insertOne(newUser);
  } catch (err) {
    console.error("Something went wrong creating new user", err.message);
    // res.sendStatus(404);
  }
};

connectToDatabase()
  .then(() => {
    app.use("/items", itemsRouter);

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });

    // let session;
    //
    // app.get("/", (req, res) => {
    //   session = req.session;
    //   if (session.userid) { // checking if session exists, endpoint #1
    //     // check User in DB, if doesn't exist, create user in DB
    //
    //     //  create session, endpoint #2
    //
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
          // res.json({ ok: 1 });

          const { data } = await axios({
            url: "https://api.github.com/user",
            method: "get",
            headers: {
              Authorization: `token ${token}`,
            },
          });

          const isUserExistsInDB = await checkUserInMongoDB({
            githubUserId: data.id,
          });

          if (isUserExistsInDB === undefined) {
            await createUserInMongoDB(data.id, data.name);
          }

          res.redirect("http://localhost:3000/");
        })
        .catch((err) => res.status(500).json({ message: err.message }));
    });
  })
  .catch((error: Error) => {
    console.error("Database connection failed", error);
    process.exit();
  });
