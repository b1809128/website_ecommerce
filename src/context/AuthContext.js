import { createContext, useReducer, useEffect } from "react";
import AuthReducer from "./AuthReducer";
// Create Default context values
const INITIAL_STATE = {
  user: localStorage.getItem("userID") || null,
  isFetching: false,
  error: false,
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
  //Set LocalStorage
  useEffect(() => {
    localStorage.setItem("userID", state.user);
  }, [state.user]);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
