import "./User.css";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "../../api/getUser";
import { useContext, useEffect } from "react";
import { UserContext } from "../../contexts";

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

  // TODO improve loading state
  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (error) return "An error has occurred: " + error.message;

  return (
    <div className="user">
      <img src={avatarUrl} alt="user-avatar" className="user-avatar" />
      <p>Hey {userName}!</p>
    </div>
  );
};
