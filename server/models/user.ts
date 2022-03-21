import { ObjectId } from "mongodb";

export default class User {
  constructor(
    public githubUserId: number,
    public userName: string,
    public favouriteItems: ObjectId[],
    public _id: ObjectId
  ) {}
}
