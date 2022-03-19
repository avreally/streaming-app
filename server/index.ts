import express from "express";
import { connectToDatabase } from "./services/database.service";
import { itemsRouter } from "./routes/items.router";
import "dotenv/config";
import axios from "axios";

const app = express();
app.use(express.json());

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;

app.get("/login", (_req, res) => {
  res.redirect(
    `https://github.com/login/oauth/authorize?client_id=${clientId}`
  );
});

let token: string | undefined = "";

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
    .then(async (_token) => {
      token = _token;
      console.log("My token:", token);
      res.json({ ok: 1 });

      const { data } = await axios({
        url: "https://api.github.com/user",
        method: "get",
        headers: {
          Authorization: `token ${token}`,
        },
      });
      console.log(data.id, data.name); // { id, email, name, login, avatar_url }
      return data;
    })
    .catch((err) => res.status(500).json({ message: err.message }));
});

const PORT = 3001;

connectToDatabase()
  .then(() => {
    app.use("/items", itemsRouter);

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error: Error) => {
    console.error("Database connection failed", error);
    process.exit();
  });
