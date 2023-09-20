import React, { useReducer } from "react";
import MkdSDK from "./utils/MkdSDK";

export const AuthContext = React.createContext();

const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
  role: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem('token',action.payload.token);
      localStorage.setItem('role',action.payload.role);
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user_id, 
        token: action.payload.token, 
        role: action.payload.role,
    };
    case "LOGOUT":
      localStorage.clear();
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    default:
      return state;
  }
};

let sdk = new MkdSDK();

export const tokenExpireError = (dispatch, errorMessage) => {
  if (errorMessage === "TOKEN_EXPIRED") {
    dispatch({
      type: "Logout",
    });
    window.location.href = "/" + role + "/login";
  }
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const role = localStorage.getItem("role");

  const isValid = async () => {
    try {
      const res = await sdk.check(role);

      if (res.status !== 200) {
        dispatch({
          type: "LOGOUT",
        });
        window.location.href = "/admin/login";
      }
      
    } catch (err) {
      console.error("Token validation error:", err.message);
      // window.location.href = "/admin/login";
    }
  };

  React.useEffect(() => {
    isValid();
  },[]);

  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
