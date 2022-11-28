import { createContext, useContext, useState, useEffect } from "react";
import { message } from "antd";

const LOCALSTORAGE_KEY = "save-me";
const savedMe = localStorage.getItem(LOCALSTORAGE_KEY);

const ChatContext = createContext({
  status: {},
  me: "",
  signedIn: false,
  messages: [],
  startChat: () => {},
  sendMessage: () => {},
  displayStatus: () => {},
});

const client = new WebSocket("ws://localhost:4000");

const ChatProvider = (props) => {
  const [status, setStatus] = useState({});
  const [me, setMe] = useState(savedMe || "");
  const [signedIn, setSignedIn] = useState(false);
  const [messages, setMessages] = useState([]);

  client.onmessage = (byteString) => {
    const { data } = byteString;
    const [task, payload] = JSON.parse(data);
    switch (task) {
      case "CHAT": {
        setMessages(payload);
        break;
      }
      case "MESSAGE": {
        setMessages(() => [...messages, payload]);
        break;
      }
      case "status": {
        setStatus(payload);
        break;
      }
      default:
        break;
    }
  };

  const startChat = ( name, to ) => {
    if (!name || !to) throw new Error("Name or to required.");

    sendData({
      type: "CHAT",
      payload: { name, to },
    });
  };

  const sendMessage = ( name, to, body ) => {
    if (!name || !to || !body) throw new Error("Name or body to required.");

    sendData({
      type: "MESSAGE",
      payload: { name, to, body },
    });
  };

  const sendData = async (data) => {
    await client.send(JSON.stringify(data));
  };

  const displayStatus = (payload) => {
    if (payload.msg) {
      const { type, msg } = payload;
      const content = {
        content: msg,
        duration: 0.5,
      };
      switch (type) {
        case "success": {
          message.success(content);
          break;
        }
        case "error":
        default:
          message.error(content);
          break;
      }
    }
  };

  useEffect(() => {
    if (signedIn) {
      localStorage.setItem(LOCALSTORAGE_KEY, me);
    }
  }, [me, signedIn]);

  return (
    <ChatContext.Provider
      value={{
        status,
        me,
        signedIn,
        messages,
        setMe,
        startChat,
        sendMessage,
        setSignedIn,
        displayStatus,
      }}
      {...props}
    />
  );
};

const useChat = () => useContext(ChatContext);

export { ChatProvider, useChat };
