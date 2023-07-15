/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  selectAuthForm,
  selectAuthStatus,
} from "store/selectors/authSelectors";
import { authActions } from "store/reducers/authReducer";
import { useIsAuthenticated } from "hooks/auth";
import { PATHS } from "config/routes";

import { EyeShowIcon, EyeHideIcon } from "components/layouts/Icons";
import { Form, InputText, Button, Spinner } from "components/layouts";
import * as Styled from "./Login.styled";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const form = useSelector(selectAuthForm);
  const status = useSelector(selectAuthStatus);

  const { isAuthenticated } = useIsAuthenticated();

  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = (e) => {
    e.preventDefault();
    setShowPassword((prev) => !prev);
  };

  function handleAuthForm({ key, value }) {
    dispatch(authActions.setAuthForm({ key, value }));
  }

  function handleAuth(e) {
    e.preventDefault();
    dispatch(authActions.login({ email: form.email, password: form.password }));
  }

  useEffect(() => {
    if (!isAuthenticated) return;
    navigate(PATHS.main_navigation.home, { replace: true });
  }, [isAuthenticated]);

  return (
    <Styled.Login>
      <Form>
        <InputText
          type="email"
          placeholder="Email"
          name="email"
          value={form.email}
          onChange={(e) =>
            handleAuthForm({ key: e.target.name, value: e.target.value })
          }
        />

        <div className="password-field">
          <InputText
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            name="password"
            value={form.password}
            onChange={(e) =>
              handleAuthForm({ key: e.target.name, value: e.target.value })
            }
          />
          <button onClick={handleShowPassword}>
            {showPassword ? <EyeHideIcon /> : <EyeShowIcon />}
          </button>
        </div>

        {status.error && <p>{status.message}</p>}

        <Button caption="ავტორიზაცია" onClick={handleAuth} />
      </Form>
      {status.loading && <Spinner />}
    </Styled.Login>
  );
}
