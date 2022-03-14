import { ObjectId } from "mongodb";

export default class Item {
  constructor(public title: string, public url: string, public id?: ObjectId) {}
}
