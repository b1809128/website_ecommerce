import RegisterForm from "../../components/auth/registerform/RegisterForm";
import React, { useEffect } from "react";
export default function Register() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <RegisterForm />
    </>
  );
}
