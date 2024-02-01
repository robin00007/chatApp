import { createContext, useState } from "react";

export const LoginContext = createContext();
const ContextProvider = ({ children }) => {
  const [login, setLogin] = useState({
    isLogin: false,
    data: null,
  });
  console.log("login", login);
  const updateState = (newState) => {
    setLogin(newState);
  };
  return (
    <LoginContext.Provider value={{ login, updateState }}>
      {children}
    </LoginContext.Provider>
  );
};
export default ContextProvider;
