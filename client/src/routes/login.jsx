import { useContext, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LoginContext } from "../utils/contextProvider";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { io } from "socket.io-client";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import Button from "@mui/material/Button";
import { Box, Container } from "@mui/material";
const CustomNavbar = styled(AppBar)`
  height: 150px;
  background-color: #00a884;
  position: relative;
`;
const StyledContainer = styled(Box)`
  widht: 100%;
  height: 100vh;
  background-color: black;
`;
const LoginContainer = styled(Box)`
  width: 70%;
  display: flex;
  position: absolute;
  top: 70%;
  left: 15%;
  background-color: white;
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

export const socket = io(process.env.REACT_APP_SOCKET_URL);
const Login = () => {
  const { login, updateState } = useContext(LoginContext);
  const navigate = useNavigate();

  const connectionWithServer = (data) => {
    socket.on("connect", () => {
      socket.emit("login", data);
    });
  };

  useEffect(() => {
    if (login.isLogin) {
      navigate("/");
    }
  }, []);

  return (
    <StyledContainer>
      <CustomNavbar position="static">
        <Toolbar variant="dense">
          <Typography variant="h6" color="inherit" component="p">
            WHATSAPP WEB
          </Typography>
        </Toolbar>
        <LoginContainer>
          <Typography variant="h6" color="black" component="p">
            Use whatsapp on your desktop
          </Typography>
          <ul style={{ color: "black" }}>
            <li>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi,
              nihil?
            </li>
            <li>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi,
              nihil?
            </li>
            <li>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi,
              nihil?
            </li>
            <li>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi,
              nihil?
            </li>
            <li>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi,
              nihil?
            </li>
          </ul>
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
        </LoginContainer>
      </CustomNavbar>
    </StyledContainer>
  );
};
export default Login;
