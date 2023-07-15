/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import { useIsAuthenticated } from "hooks/auth";
import ModerateContainer from "components/Moderate/ModerateContainer";

import { Spinner } from "components/layouts";

export default function ModeratePage({ roles }) {
  const navigate = useNavigate();

  const { userRole, loading } = useIsAuthenticated();

  useEffect(() => {
    if (loading) return;

    if (!roles.includes(userRole)) {
      navigate("/home", { replace: true });
    }
  }, [userRole, roles, loading]);

  return !loading ? (
    <ModerateContainer>
      <Outlet />
    </ModerateContainer>
  ) : (
    <Spinner />
  );
}
