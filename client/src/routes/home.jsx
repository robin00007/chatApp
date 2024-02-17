import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import ChatBox from "../components/chatBox";
import { LoginContext } from "../utils/contextProvider";

function Home() {
  const [users, setUsers] = useState([]); // [state, setState]
  const { login, updateState } = useContext(LoginContext);
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
    <div>
      <Link to="/login">Login</Link>
      <h1>Home</h1>
      {users.map((user) => {
        return <ChatBox user={user} key={user._id} />;
      })}
    </div>
  );
}

export default Home;
