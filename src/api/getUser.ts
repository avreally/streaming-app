import axios from "axios";
import { User } from "../types/types";

const baseUrl = "http://localhost:3001";

export async function getUser(): Promise<User> {
  const response = await axios.get(`${baseUrl}/me`, {
    withCredentials: true,
  });

  return response.data;
}
