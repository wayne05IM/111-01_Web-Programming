import { useState, useEffect, createContext, useContext } from "react";
import { message } from "antd";

const LOCALSTORAGE_KEY = "save-me";
const savedMe = localStorage.getItem(LOCALSTORAGE_KEY);

import { useQuery, useMutation, useLazyQuery } from "@apollo/client";
import {
  CHATBOX_QUERY,
  CREATE_CHATBOX_MUTATION,
  MESSAGE_SUBSCRIPTION,
  CREATE_MESSAGE_MUTATION,
} from "../../graqhql";

const ChatContext = createContext({
  status: {},
  me: "",
  signedIn: false,
  messages: [],
  sendMessage: () => {},
  startChat: () => {},
  clearMessages: () => {},
  getData: () => {},
  setMessages: () => {},
});

// const client = new WebSocket("ws://localhost:4000");

const ChatProvider = (props) => {
  const [status, setStatus] = useState({});
  const [me, setMe] = useState(savedMe || "");
  const [signedIn, setSignedIn] = useState(false);
  const [messages, setMessages] = useState([]);

  const [startChat] = useMutation(CREATE_CHATBOX_MUTATION);
  const [sendMessage] = useMutation(CREATE_MESSAGE_MUTATION);

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
        setMessages,
      }}
      {...props}
    />
  );
};
const useChat = () => useContext(ChatContext);
export { ChatProvider, useChat };
