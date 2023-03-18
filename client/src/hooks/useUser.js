import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { getUser, logOut } from "../utils/userServices";
import { getUserFromToken } from "../utils/tokenServices";

export default function useUser() {
  const [state, setState] = useContext(UserContext);

  const handleAuth = () => {
    const freshUser = getUser();
    setState((state) => ({ ...state, user: freshUser }));
  };

  const handleLogOut = () => {
    logOut();
    setState({ ...state, user: null });
  };

  const refreshAuth = () => {
    if (typeof window == "undefined") return false;

    if (localStorage.getItem("token")) {
      const user = getUserFromToken();
      return setState({ ...state, user });
    } else return false;
  };

  return {
    user: state.user,
    handleAuth,
    handleLogOut,
    refreshAuth,
  };
}
