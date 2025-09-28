import express, { Request, Response } from "express";
import { collections } from "../services/database.service.js";

export const itemsRouter = express.Router();

itemsRouter.use(express.json());

itemsRouter.get("/", async (_req: Request, res: Response) => {
  try {
    const items = await collections.items?.find({}).toArray();

    res.status(200).send(items);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

itemsRouter.get("/:id", async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const query = { _id: id };
    const item = await collections.items?.findOne(query);

    if (item) {
      res.status(200).send(item);
    }
  } catch (error) {
    res
      .status(404)
      .send(`Unable to find matching document with id: ${req.params.id}`);
  }
});
