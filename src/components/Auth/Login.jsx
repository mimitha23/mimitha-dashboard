import { Controller } from "react-hook-form";

import useAuthForm from "hooks/auth/useAuthForm";

import * as Styled from "./Login.styled";
import { Spinner } from "components/layouts";
import * as Form from "components/layouts/Form";
import { EyeShowIcon, EyeHideIcon } from "components/layouts/Icons";

export default function Login() {
  const { form, showPassword, handleShowPassword, onSubmit, status } =
    useAuthForm();

  return (
    <Styled.Login>
      <Form.Form onSubmit={form.handleSubmit(onSubmit)}>
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState: { error } }) => (
            <Form.InputText
              type="email"
              placeholder="Email"
              fieldProps={field}
              error={error ? true : false}
              message={error?.message}
            />
          )}
        />

        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState: { error } }) => (
            <div className="password-field">
              <Form.InputText
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                fieldProps={field}
                error={error ? true : false}
                message={error?.message}
              />
              <button onClick={handleShowPassword}>
                {showPassword ? <EyeHideIcon /> : <EyeShowIcon />}
              </button>
            </div>
          )}
        />

        {status.error && <p>{status.message}</p>}

        <Form.Button caption="ავტორიზაცია" type="submit" />
      </Form.Form>
      {status.loading && <Spinner />}
    </Styled.Login>
  );
}
