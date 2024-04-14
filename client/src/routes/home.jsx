import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ChatBox from "../components/chatBox";
import { LoginContext } from "../utils/contextProvider";
import { Box, Paper, Stack, Typography, IconButton } from "@mui/material";
import styled from "@emotion/styled";
import SettingsIcon from "@mui/icons-material/Settings";

const StyledStack = styled(Stack)`
  display: flex;
  flex: 1;
  width: "30%";
  background-color: "lightblue";
`;

function Home() {
  const [users, setUsers] = useState([]); // [state, setState]
  const { login } = useContext(LoginContext);
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
    getUser();
    if (!login.isLogin) {
      navigate("/login");
    }
  }, []);

  return (
    <Paper
      direction={"column"}
      varient={"elevation"}
      elevation={4}
      sx={{
        width: 300,
        height: "100vh",
        padding: "1rem",
      }}
    >
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Typography variant="h5" color="initial">
          Chats7dd
        </Typography>
        <IconButton aria-label="settings">
          <SettingsIcon />
        </IconButton>
      </Stack>
      <Box>
        {users.map((user) => {
          return <ChatBox user={user} key={user._id} />;
        })}
      </Box>
    </Paper>
  );
}

export default Home;
