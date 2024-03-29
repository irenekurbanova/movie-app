import { useReducer } from "react";
import { AuthenticationContext, AuthenticationDispatchContext, authReducer, initialAuthData } from "./auth-context";

type AuthenticationProviderProps = {
  children: JSX.Element;
};

export function AuthenticationProvider({ children }: AuthenticationProviderProps) {
  const [authState, dispatch] = useReducer(authReducer, initialAuthData);

  return (
    <AuthenticationContext.Provider value={authState}>
      <AuthenticationDispatchContext.Provider value={dispatch}>{children}</AuthenticationDispatchContext.Provider>
    </AuthenticationContext.Provider>
  );
}
