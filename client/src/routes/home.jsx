import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ChatBox from "../components/chatBox";
import { LoginContext } from "../utils/contextProvider";
import { Box, Paper, Stack, Typography, IconButton } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import Chat from "../components/chat";

function Home() {
  const [users, setUsers] = useState([]); // [state, setState]
  const [activeChat, setActiveChat] = useState(null);
  const { login } = useContext(LoginContext);
  console.log("login", login);
  const navigate = useNavigate();
  const getUser = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/users`
      );
      const data = response.data;
      setUsers(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!login.isLogin) {
      navigate("/login");
    }
    getUser();
  }, []);

  return (
    <Stack direction={"row"}>
      <Paper
        direction={"column"}
        varient={"elevation"}
        elevation={4}
        sx={{
          width: 300,
          height: "100vh",
          padding: "1rem",
          background: "white",
        }}
      >
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
          sx={{ background: "lightblue" }}
        >
          <Typography variant="h5" color="initial">
            Chats
          </Typography>
          <IconButton aria-label="settings">
            <SettingsIcon />
          </IconButton>
        </Stack>
        <Box>
          {users
            .filter((user) => {
              return user.name !== login.data.name;
            })
            .map((user) => {
              return (
                <ChatBox
                  user={user}
                  key={user._id}
                  setActiveChat={setActiveChat}
                />
              );
            })}
        </Box>
      </Paper>
      <Stack minHeight={"100%"} width={"100%"}>
        {activeChat ? (
          <Chat user={activeChat} key={activeChat._id} />
        ) : (
          <Stack
            justifyContent={"center"}
            alignItems={"center"}
            height={"100%"}
            width={"100%"}
            sx={{ background: "pink" }}
          >
            start A new conversation
          </Stack>
        )}
      </Stack>
    </Stack>
  );
}

export default Home;
