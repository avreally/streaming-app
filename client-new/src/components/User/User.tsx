import "./User.css";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "../../api/getUser";
import { useContext, useEffect } from "react";
import { UserContext } from "../../contexts";
import { Loader } from "../Loader/Loader";

export const User = () => {
  const { isLoading, data, error } = useQuery({
    queryKey: ["user"],
    queryFn: () => getUser(),
  });

  useEffect(() => {
    if (data !== undefined) {
      setUser(data);
    }
  }, [data]);

  const { user, setUser } = useContext(UserContext);

  const userName = user?.userName ? user.userName : "someone";
  const avatarUrl = user?.avatarUrl
    ? user.avatarUrl
    : "https://picsum.photos/200";

  if (isLoading) {
    return <Loader />;
  }

  if (error) return "An error has occurred: " + error.message;

  return (
    <div className="user">
      <img src={avatarUrl} alt="user-avatar" className="user-avatar" />
      <p>Hey {userName}!</p>
    </div>
  );
};
