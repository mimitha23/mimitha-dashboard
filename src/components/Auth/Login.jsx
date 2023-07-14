import { useState } from "react";
import { useDispatch } from "react-redux";

import { authActions } from "store/reducers/authReducer";

import { EyeShowIcon, EyeHideIcon } from "components/layouts/Icons";
import { Form, InputText, Button, Spinner } from "components/layouts";
import * as Styled from "./Login.styled";

export default function Login() {
  const dispatch = useDispatch();

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
    dispatch(authActions.login());
  }

  return (
    <Styled.Login>
      <Form>
        <InputText
          type="email"
          placeholder="Email"
          name="email"
          onChange={(e) =>
            handleAuthForm({ key: e.target.name, value: e.target.value })
          }
        />
        <div className="password-field">
          <InputText
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            name="password"
            onChange={(e) =>
              handleAuthForm({ key: e.target.name, value: e.target.value })
            }
          />
          <button onClick={handleShowPassword}>
            {showPassword ? <EyeHideIcon /> : <EyeShowIcon />}
          </button>
        </div>
        <Button caption="ავტორიზაცია" onClick={handleAuth} />
      </Form>
      {false && <Spinner />}
    </Styled.Login>
  );
}
