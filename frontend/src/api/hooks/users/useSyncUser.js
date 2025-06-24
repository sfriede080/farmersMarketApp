import { useQuery } from "react-query";
import { syncUser } from "../../services/userService.js";

const useSyncUser = ({ user, getAccessTokenSilently, isAuthenticated }) => {
  return useQuery(
    ["dbUser", user?.sub],
    () => syncUser(user, getAccessTokenSilently),
    {
      enabled: !!user && isAuthenticated,
    }
  );
};

export default useSyncUser;
