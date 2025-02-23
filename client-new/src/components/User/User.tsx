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

  // TODO improve loading state
  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (error) return "An error has occurred: " + error.message;

  return (
    <div>
      {user !== undefined ? (
        <div className="user">
          <p>Hey {user.userName}!</p>
          <img src={user.avatarUrl} alt="user-avatar" className="user-avatar" />
        </div>
      ) : null}
    </div>
  );
};
