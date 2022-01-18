import LoginForm from "../../components/auth/loginform/LoginForm";
import React, { useEffect } from "react";
export default function Login() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <LoginForm />
    </>
  );
}
