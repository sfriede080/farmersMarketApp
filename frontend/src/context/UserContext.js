import { createContext } from "react";

const UserContext = createContext({
  user: { name: "Guest", email: "", picture: null, id: -1 },
  isAuthenticated: false,
  isLoading: false,
  isAdmin: false,
});

export default UserContext;
