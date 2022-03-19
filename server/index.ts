import express from "express";
import { collections, connectToDatabase } from "./services/database.service";
import { itemsRouter } from "./routes/items.router";
import "dotenv/config";
import axios from "axios";
import User from "./models/user";

const app = express();
app.use(express.json());

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;

const PORT = 3001;

connectToDatabase()
  .then(() => {
    app.use("/items", itemsRouter);

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
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
          console.log("My token:", token);
          res.json({ ok: 1 });

          const { data } = await axios({
            url: "https://api.github.com/user",
            method: "get",
            headers: {
              Authorization: `token ${token}`,
            },
          });
          console.log(data.id, data.name);
          const newUser = new User(data.id, data.name, []);
          await collections.users?.insertOne(newUser);
        })
        .catch((err) => res.status(500).json({ message: err.message }));
    });
  })
  .catch((error: Error) => {
    console.error("Database connection failed", error);
    process.exit();
  });
