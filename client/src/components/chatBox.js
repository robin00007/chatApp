import { useContext, useState } from "react";
import { socket } from "../routes/login";
import { LoginContext } from "../utils/contextProvider";
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

  return (
    <div
      style={{
        border: "2px solid black",
        margin: "10px",
        padding: "10px",
      }}
    >
      <h3>{user.name}</h3>
      <p>{user.email}</p>
      <input
        value={chat}
        onChange={(e) => {
          setChat(e.target.value);
        }}
        onKeyDown={hanldePressEnter}
      />
      {chatList.map((chat, index) => {
        return <p key={index}>{chat}</p>;
      })}
    </div>
  );
};
export default ChatBox;
