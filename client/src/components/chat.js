import { Stack, styled, TextField, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import { LoginContext } from "../utils/contextProvider";
import { socket } from "../routes/login";

const StyledInput = styled(TextField)`
  width: 90%;
  padding: 5px;
  margin: 5px;
  position: absolute;
  bottom: 10px;
`;
function Chat({ user }) {
  const { login, updateState } = useContext(LoginContext);
  const [chats, setChats] = useState([]);
  const [typing, setTyping] = useState("");
  const [message, setMessage] = useState(null);
  socket.on("recieve message", (data) => {
    console.log("recieved message data :", data);
    if (data.name === user.name) {
      console.log("this is runnign");
      setChats([...chats, { owner: data.name, message: data.chat }]);
    }
  });
  return (
    <Stack direction={"column"} sx={{ position: "relative", height: "95%" }}>
      <Typography variant="h5" color="initial" padding={1}>
        {user.name ? user.name : "Username"}
      </Typography>
      <Stack direction={"column"} padding={1}>
        {chats.length > 0
          ? chats.map((chat, idx) => {
              return (
                <Stack
                  key={idx}
                  width={"100%"}
                  direction={"row"}
                  justifyContent={
                    chat.owner === "Me" ? "flex-end" : "flex-start"
                  }
                  padding={1}
                  margin={1}
                >
                  <Stack
                    sx={{
                      background: "pink",
                      padding: "5px 20px",
                      borderRadius: "15px",
                    }}
                  >
                    {chat.message}
                  </Stack>
                </Stack>
              );
            })
          : "No chats"}
      </Stack>
      <StyledInput
        placeholder="Start typing moroon "
        value={typing}
        onChange={(e) => {
          setTyping(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            console.log("chat typing", typing);
            socket.emit("chat", {
              user: user,
              chat: typing,
              owner: login.data.name,
            });
            setChats([...chats, { owner: "Me", message: typing }]);
            setTyping("");
          }
        }}
      />
    </Stack>
  );
}

export default Chat;
