/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { PATHS } from "config/routes";
import { useIsAuthenticated } from "hooks/auth";
import { authActions } from "store/reducers/authReducer";
import * as authSelectors from "store/selectors/authSelectors";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authValidation } from "utils/zod/auth/authValidation";

export default function useAuthForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(authValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const status = useSelector(authSelectors.selectAuthStatus);

  const { isAuthenticated } = useIsAuthenticated();

  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = (e) => {
    e.preventDefault();
    setShowPassword((prev) => !prev);
  };

  const onSubmit = (values) => dispatch(authActions.login(values));

  useEffect(() => {
    if (!isAuthenticated) return;
    navigate(PATHS.main_navigation.home, { replace: true });
  }, [isAuthenticated]);

  return { form, showPassword, handleShowPassword, onSubmit, status };
}
