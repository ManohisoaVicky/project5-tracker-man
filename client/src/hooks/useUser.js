import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { UserContext } from "../context/UserContext";
import { getUser, logOut } from "../utils/userServices";
import { getUserFromToken } from "../utils/tokenServices";

export default function useUser() {
  const navigate = useNavigate();

  const [state, setState] = useContext(UserContext);

  const handleAuth = async () => {
    const freshUser = await getUser();
    setState((state) => ({ ...state, user: freshUser }));
  };

  const handleLogOut = () => {
    logOut();
    setState({ ...state, user: null });
    navigate("/");
  };

  const refreshAuth = async () => {
    if (typeof window == "undefined") return false;

    if (localStorage.getItem("token")) {
      const user = await getUserFromToken();
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
