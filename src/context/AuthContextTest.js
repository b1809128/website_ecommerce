import { createContext, useReducer, useEffect } from "react";
import AuthReducerTest from "./AuthReducerTest";
// Create Default context values
const INITIAL_STATE = {
  user: localStorage.getItem("userID") || null,
  isFetching: false,
  error: false,
};

export const AuthContextTest = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducerTest, INITIAL_STATE);
  //Set LocalStorage
  useEffect(() => {
    localStorage.setItem("userID", state.user);
  }, [state.user]);

  return (
    <AuthContextTest.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContextTest.Provider>
  );
};
