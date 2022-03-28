import "./UserGreeting.css";
import { UserType } from "../../../types";

type UserGreetingProps = {
  className: string;
  userData: UserType;
};

const UserGreeting = ({ className, userData }: UserGreetingProps) => {
  return <div className={className}>Hello {userData.userName}!</div>;
};

export default UserGreeting;
