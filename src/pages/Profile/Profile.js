import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
function Profile({ authorized }) {
  const { user } = useContext(AuthContext);

  console.log(user);
  if (!authorized) {
    return <Redirect to="/sign-in" />;
  }
  return <div>{JSON.stringify(user)}</div>;
}

export default Profile;
