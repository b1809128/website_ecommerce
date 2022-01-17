import React,{useContext,useEffect,useState} from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import {Redirect} from "react-router-dom"
export default function Edit() {
  const {user}= useContext(AuthContext);
  const [authorized, setAuthorized] = useState(true);
  useEffect(() => {
    window.scrollTo(0, 0);
    const fetch = async () => {
      const res1 = await axios.post("http://localhost:5000/auth/admin", {
        token: user.token,
      });
      //   console.log(res);
      if (res1.data.logged) {
        setAuthorized(true);
        // setAuthText(res.data.message);
      } else {
        setAuthorized(false);
        // setAuthText(res.data.message);
      }
      
    };
    fetch();
  }, [user.token]);
  if (!authorized) {
    // alert("You are not authorized !");
    return <Redirect to="/sign-in" />;
  }
  return <div>This is Edit page</div>;
}
