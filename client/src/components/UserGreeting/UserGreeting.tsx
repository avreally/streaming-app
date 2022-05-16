import "./UserGreeting.css";
import { UserType } from "../../../types";

type UserGreetingProps = {
  className: string;
  userData: UserType | undefined;
};

const UserGreeting = ({ className, userData }: UserGreetingProps) => {
  return (
    <div className={className}>
      {userData === undefined ? (
        <div>Hello, please sign in</div>
      ) : (
        <div>Hello {userData.userName}!</div>
      )}
    </div>
  );
};

export default UserGreeting;
