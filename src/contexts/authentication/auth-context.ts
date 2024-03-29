import { createContext, Dispatch, useContext } from "react";

type AuthDataProps = {
  email: string;
  isLoggedIn: boolean;
  token: string;
  session_id: string;
  expires_at: string;
};

const initialAuthData: AuthDataProps = {
  email: "",
  isLoggedIn: false,
  token: "",
  session_id: "",
  expires_at: "",
};

const AuthenticationContext = createContext<AuthDataProps>(initialAuthData);
const AuthenticationDispatchContext = createContext<Dispatch<AuthAction>>(() => null);

type AuthAction =
  | { type: "setEmail"; email: string }
  | { type: "setIsLoggedIn"; isLoggedIn: boolean }
  | { type: "setToken"; token: string }
  | { type: "setSessionId"; id: string };

function authReducer(state: AuthDataProps, action: AuthAction) {
  switch (action.type) {
    case "setEmail": {
      return { ...state, email: action.email };
    }
    case "setIsLoggedIn": {
      return { ...state, isLoggedIn: action.isLoggedIn || state.token.length !== 0 };
    }
    case "setToken": {
      return { ...state, token: action.token };
    }
    case "setSessionId": {
      return { ...state, session_id: action.id };
    }
    default: {
      return state;
    }
  }
}

function useAuthContext() {
  return useContext(AuthenticationContext);
}

function useAuthDispatch() {
  return useContext(AuthenticationDispatchContext);
}

export {
  initialAuthData,
  AuthenticationContext,
  AuthenticationDispatchContext,
  authReducer,
  useAuthContext,
  useAuthDispatch,
};
