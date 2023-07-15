/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import decode from "jwt-decode";
import { jwt } from "utils";

import { PATHS, PUBLIC_ROUTES } from "config/routes";
import { selectUser } from "store/selectors/authSelectors";

export default function useIsAuthenticated(redirectUnauthorised = false) {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [userRole, setUserRole] = useState("");
  const [isAuthenticated, setisAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const user = useSelector(selectUser);

  function stopCheck() {
    setLoading(false);

    if (isAuthenticated) {
      console.log("stop check");
      setisAuthenticated(false);
      setUserRole("");
    }

    if (
      redirectUnauthorised &&
      !PUBLIC_ROUTES.some((route) => pathname.match(route))
    )
      navigate(PATHS.main_navigation.login, { replace: true });
  }

  useEffect(() => {
    const mimitha_passport = jwt.getJWT();

    if (!mimitha_passport) return stopCheck();

    const decodedUser = decode(mimitha_passport);

    if (
      !decodedUser ||
      !decodedUser.email ||
      !decodedUser.role ||
      !decodedUser._id ||
      decodedUser._id !== user._id
    )
      return stopCheck();

    setUserRole(decodedUser.role);
    setisAuthenticated(true);

    setLoading(false);
  }, [user]);

  return { userRole, isAuthenticated, loading };
}
