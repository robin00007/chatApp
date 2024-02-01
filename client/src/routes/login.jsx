import { GoogleLogin } from "@react-oauth/google";
import { useContext, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LoginContext } from "../utils/contextProvider";
import { io } from "socket.io-client";
const socket = io("http://localhost:3001/");

const Login = () => {
  const navigate = useNavigate();
  const { login, updateState } = useContext(LoginContext);
  console.log("context", login);
  const location = useLocation();
  console.log("location", location);
  const connectionWithServer = (username) => {
    socket.emit("login", username);
  };
  useEffect(() => {
    // Listen for userLoggedIn event
    socket.on("userLoggedIn", (message) => {
      console.log(message);
    });

    // Clean up the socket connection on unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div>
      <Link to="/">Home</Link>
      <h1>Login</h1>
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          console.log(credentialResponse);
          updateState({
            isLogin: true,
            data: credentialResponse,
          });
          connectionWithServer("robin");
          navigate("/");
        }}
        onError={() => {
          console.log("Login Failed");
        }}
      />
    </div>
  );
};
export default Login;
