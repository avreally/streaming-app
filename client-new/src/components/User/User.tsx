import "./User.css";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "../../api/getUser";

export const User = () => {
  const { isLoading, data, error } = useQuery({
    queryKey: ["user"],
    queryFn: () => getUser(),
  });

  // TODO improve loading state
  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (error) return "An error has occurred: " + error.message;

  return (
    <div>
      {data !== undefined ? (
        <div className="user">
          <p>Hey {data.userName}!</p>
          <img src={data.avatarUrl} alt="user-avatar" className="user-avatar" />
        </div>
      ) : null}
    </div>
  );
};
