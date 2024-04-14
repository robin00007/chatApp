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
const StyledBox = styled(Box)(({ theme }) => {
  return {
    display: "flex",
    padding: "10px 0px",
    width: "100%",
    alignItems: "center",
    boxShadow: "none",
  };
});
const StyledAvatar = styled(Avatar)(({ theme }) => {
  return {
    marginRight: "1rem",
  };
});
const ChatBox = ({ user }) => {
  const [chat, setChat] = useState("");
  const [chatList, setChatList] = useState([]);
  const { login, updateState } = useContext(LoginContext);
  const handleChat = () => {
    console.log("login", login);
    console.log(socket);
    socket.emit("chat", { user, chat, owner: login.data.name });
    socket.on("recieve message", (data) => {
      console.log("server data : ", data);
      if (data.owner === user.name) {
        setChatList([...chatList, data.chat]);
      }
    });
  };
  const hanldePressEnter = (e) => {
    if (e.key === "Enter") {
      handleChat();
      setChat("");
    }
  };
  console.log(user);

  return (
    <StyledBox>
      <StyledAvatar src={user.picture}>W</StyledAvatar>
      <Typography variant={"h6"}>{user.name}</Typography>
      {/* <p>{user.email}</p> */}
      {/* <input
        value={chat}
        onChange={(e) => {
          setChat(e.target.value);
        }}
        onKeyDown={hanldePressEnter}
      /> */}
      {chatList.map((chat, index) => {
        return <p key={index}>{chat}</p>;
      })}
    </StyledBox>
  );
};
export default ChatBox;
