import express from "express";
import { connectToDatabase } from "./services/database.service";
import { itemsRouter } from "./routes/items.router";
import "dotenv/config";
import axios from "axios";

const app = express();
app.use(express.json());

let access_token = "";

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;

app.get("/github/callback", (_req, res) => {
  const requestToken = _req.query.code;

  axios({
    method: "post",
    url: `https://github.com/login/oauth/authorize?client_id=${clientId}&client_secret=${clientSecret}&code=${requestToken}`,
    headers: {
      accept: "application/json",
    },
  }).then((response) => {
    access_token = response.data.access_token;
    res.redirect("/success");
  });
  // res.redirect(
  //   `https://github.com/login/oauth/authorize?client_id=${clientId}`
  // );
});

app.get("/success", function (_req, res) {
  axios({
    method: "get",
    url: `https://api.github.com/user`,
    headers: {
      Authorization: "token " + access_token,
    },
  }).then((response) => {
    res.render("pages/success", { userData: response.data });
  });
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
