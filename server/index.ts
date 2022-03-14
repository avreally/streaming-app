import express from "express";
import { connectToDatabase } from "./services/database.service";
import { itemsRouter } from "./routes/items.router";

const app = express();
app.use(express.json());

const PORT = 3000;

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
