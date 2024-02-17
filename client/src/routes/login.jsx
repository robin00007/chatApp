import { GoogleLogin } from "@react-oauth/google";
import { useContext, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LoginContext } from "../utils/contextProvider";
import { io } from "socket.io-client";
export const socket = io(process.env.REACT_APP_SOCKET_URL);
const Login = () => {
  const navigate = useNavigate();
  const { login, updateState } = useContext(LoginContext);

  const location = useLocation();
  console.log("location", location);

  const connectionWithServer = (data) => {
    socket.on("connect", () => {
      console.log("socket id :", socket.id); // x8WIv7-mJelg7on_ALbx
      console.log("socket connected : ", socket.connected);
      socket.emit("login", data);
    });
  };
  useEffect(() => {
    if (login.isLogin) {
      navigate("/");
    }
  }, []);

  return (
    <div>
      <Link to="/">Home</Link>
      <h1>Login</h1>
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          console.log(credentialResponse);
          console.log(jwtDecode(credentialResponse.credential));
          updateState({
            isLogin: true,
            googleResponse: credentialResponse,
            data: jwtDecode(credentialResponse.credential),
          });
          connectionWithServer(jwtDecode(credentialResponse.credential));
          navigate("/");
        }}
        onError={() => {
          console.log("Login Failed");
        }}
        useOneTap
        auto_select
      />
    </div>
  );
};
export default Login;
