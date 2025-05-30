import { useAuth0 } from "@auth0/auth0-react";
import { useContext } from "react";
import UserContext from "../context/UserContext";

export default function UserProfile() {
  const { user, isAuthenticated, isLoading } = useContext(UserContext);

  if (isLoading) {
    return <div> Loading... </div>;
  }

  return (
    isAuthenticated && (
      <div>
        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
      </div>
    )
  );
}
