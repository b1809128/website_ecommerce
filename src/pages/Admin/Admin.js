import React, { useContext, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
function Admin() {
  const { user } = useContext(AuthContext);
  const [authorized, setAuthorized] = useState(true);
  const [authText, setAuthText] = useState("");
  useEffect(() => {
    const fetch = async () => {
      const res = await axios.post("http://localhost:5000/auth/admin", {
        token: user.token,
      });
      //   console.log(res);
      if (res.data.logged) {
        setAuthorized(true);
        setAuthText(res.data.message);
      } else {
        setAuthorized(false);
        setAuthText(res.data.message);
      }
    };
    fetch();
  }, [user.token]);
  console.log(user);
  if (!authorized) {
    alert("You are not authorized !");
    return <Redirect to="/sign-in" />;
  }
  return (
    <div>
      Admin Message:
      <p>{user.result[0].user}</p>
      <p>{authText}</p>
    </div>
  );
}

export default Admin;
