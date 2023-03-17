import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import userService from "../utils/userServices";
import tokenService from "../utils/tokenServices";

export default function useUser() {
  const [state, setState] = useContext(UserContext);

  const handleAuth = () => {
    const freshUser = userService.getUser();
    setState((state) => ({ ...state, user: freshUser }));
  };

  const handleLogOut = () => {
    userService.logOut();
    setState({ ...state, user: null });
  };

  const refreshAuth = () => {
    if (typeof window == "undefined") return false;

    if (localStorage.getItem("token")) {
      const user = tokenService.getUserFromToken();
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
