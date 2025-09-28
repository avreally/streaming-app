import "./User.css";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "../../api/getUser";
import { useContext, useEffect } from "react";
import { UserContext } from "../../contexts";
import { Loader } from "../Loader/Loader";

export const User = () => {
  const { isLoading, data, error } = useQuery({
    queryKey: ["user"],
    queryFn: () =>
      getUser().catch((error) => {
        if (error.status !== 401) {
          throw error;
        }
        return null;
      }),
    retry: false,
  });

  useEffect(() => {
    if (data) {
      setUser(data);
    }
  }, [data]);

  const { user, setUser } = useContext(UserContext);

  const greeting = user?.userName ? `Hey ${user.userName}!` : "Hey, sign in!";

  const avatarUrl = user?.avatarUrl
    ? user.avatarUrl
    : "https://picsum.photos/200";

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return "Something went wrong";
  }

  return (
    <div className="user">
      <img src={avatarUrl} alt="user-avatar" className="user-avatar" />
      <p>{greeting}</p>
    </div>
  );
};
