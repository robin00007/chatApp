import { useContext, useState } from "react";
import { socket } from "../routes/login";
import { LoginContext } from "../utils/contextProvider";
import {
  Avatar,
  Box,
  Button,
  Paper,
  Stack,
  Typography,
  styled,
} from "@mui/material";
const StyledBox = styled(Box)`
  display: flex;
  flex-direction: row;
  padding: 10px 0px;
  width: 100%;
  align-items: center;
  box-shadow: none;
  background: lightgreen;
`;
const StyledAvatar = styled(Avatar)`
  marginright: "1rem";
`;

const ChatBox = ({ user, setActiveChat }) => {
  console.log("user : ", user);
  return (
    <StyledBox
      onClick={() => {
        setActiveChat(user);
      }}
    >
      <StyledAvatar src={user.picture}></StyledAvatar>
      {user.name}
    </StyledBox>
  );
};
export default ChatBox;
