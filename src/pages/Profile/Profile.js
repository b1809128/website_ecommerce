import React from "react";
import { Redirect } from "react-router-dom";
function Profile({ authorized }) {
  if (!authorized) {
    return <Redirect to="/sign-in" />;
  }
  return <div>this is a Profile</div>; 
}

export default Profile;
