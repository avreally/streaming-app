type ItemType = {
  _id: string;
  title: string;
  url: string;
};

type UserType = {
  _id: string;
  githubUserId: number;
  userName: string;
  favouriteItems: ItemType[];
};

export type { ItemType, UserType };
