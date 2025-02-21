import express from "express";
import { tracks, connectToDatabase } from "./services/database.service.js";
import "dotenv/config";
import User from "./models/user.js";
import sessions from "express-session";
import cors from "cors";

const app = express();

app.use(cors({ credentials: true, origin: "http://localhost:5173" }));

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
  }),
);

// const findUserInMongoDB = async (filter: {}) => {
//   const user = await defaultData.users?.findOne(filter);
//   if (user) {
//     return user;
//   } else {
//     return undefined;
//   }
// };

// const createUserInMongoDB = async (userId: number, userName: string) => {
//   try {
//     const newUser = new User(userId, userName, [], new ObjectId());
//     await defaultData.users?.insertOne(newUser);
//     return newUser;
//   } catch (err) {
//     console.error("Something went wrong creating new user", err.message);
//     return undefined;
//   }
// };

connectToDatabase()
  .then(() => {
    // removed because it overrides the route designed for search request
    // app.use("/tracks", tracksRouter);

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });

    app.get("/login", (_req, res) => {
      res.redirect(
        `https://github.com/login/oauth/authorize?client_id=${clientId}`,
      );
    });

    // app.get("/oauth-callback", (req, res) => {
    //   const body = {
    //     client_id: clientId,
    //     client_secret: clientSecret,
    //     code: req.query.code,
    //   };
    //   const options = { headers: { accept: "application/json" } };

    //   axios
    //     .post(`https://github.com/login/oauth/access_token`, body, options)
    //     .then((res) => res.data["access_token"])
    //     .then(async (token) => {
    //       const { data } = await axios({
    //         url: "https://api.github.com/user",
    //         method: "get",
    //         headers: {
    //           Authorization: `token ${token}`,
    //         },
    //       });

    //       let foundUser = await findUserInMongoDB({
    //         githubUserId: data.id,
    //       });

    //       if (foundUser === undefined) {
    //         foundUser = await createUserInMongoDB(data.id, data.name);
    //       }

    //       if (foundUser === undefined) {
    //         return;
    //       }

    //       // creating session
    //       const session = req.session;
    //       session.userId = foundUser._id.toString();
    //       console.log("created session for new user", foundUser._id.toString());

    //       res.redirect("http://localhost:5173/");
    //       res.end();
    //     })
    //     .catch((err) => res.status(500).json({ message: err.message }));
    // });

    // app.get("/me", async (req, res) => {
    //   console.log("session id", req.session.userId);
    //   const foundUser = await findUserInMongoDB({
    //     _id: new ObjectId(req.session.userId),
    //   });
    //   console.log(foundUser);
    //   if (!foundUser) {
    //     res.status(401);
    //     res.end();
    //     return;
    //   }
    //   res.send(foundUser);
    // });

    app.get("/logout", (req, res) => {
      req.session.destroy((err: any) => {
        console.log(err);
        res.clearCookie("connect.sid");
        res.redirect("http://localhost:5173/");
      });
      console.log("session id after logout", req.session);
    });

    // TODO change path in client from /items to /tracks
    app.get("/tracks", async (req, res) => {
      //const query = req.query.query; // req.query.query because query parameter is called "query" in the user search request

      //const search = query ? { title: new RegExp(query as string, "i") } : {}; // conditionally create mongo search
      // object based on request query

      const songs = await tracks.tracks;

      // console.log("searching for", query);
      console.log("songs are", songs);
      res.send(songs);
    });
  })
  .catch((error: Error) => {
    console.error("Database connection failed", error);
    process.exit();
  });
