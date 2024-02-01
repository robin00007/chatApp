import RouterProvider from "./routes/router";
import { GoogleOAuthProvider } from "@react-oauth/google";
import ContextProvider, { LoginContext } from "./utils/contextProvider";
import { useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";

function App() {
  const clientId = process.env.REACT_APP_CLIENT_ID;
  return (
    <ContextProvider>
      <div className="App">
        <GoogleOAuthProvider clientId={clientId}>
          <RouterProvider />
        </GoogleOAuthProvider>
      </div>
    </ContextProvider>
  );
}

export default App;
