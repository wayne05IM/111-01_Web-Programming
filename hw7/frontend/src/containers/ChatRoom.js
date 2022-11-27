import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { Tabs, Input } from "antd";
import { useChat } from "./hooks/useChat";
import Title from "../components/Title";
import Message from "../components/Message";
import ChatModal from "../components/ChatModal";

const ChatBoxesWrapper = styled(Tabs)`
  width: 100%;
  height: 300px;
  background: #eeeeee52;
  border-radius: 10px;
  margin: 20px;
  padding: 20px;
  overflow: auto;
`;

const FootRef = styled.div`
  height: 20px;
`;

const ChatRoom = () => {
  // Define states and methods
  const { me, messages, startChat, sendMessage, displayStatus } = useChat();
  const [chatBoxes, setChatBoxes] = useState([]);
  const [activeKey, setActiveKey] = useState("");
  const [msg, setMsg] = useState("");
  const [msgSent, setMsgSent] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  // const msgRef = useRef(null);
  const msgFooter = useRef(null);

  const scrollToBottom = () => {
    msgFooter.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useEffect(() => {
    scrollToBottom();
    setMsgSent(false);
  }, [msgSent]);

  // useEffect(() => {
  //   const updateChatBoxes = 
  // }, [messages])

  const createChatBox = (friend) => {
    if (chatBoxes.some(({ key }) => key === friend)) {
      throw new Error(friend + "'s chat box has already opened.");
    }
    const chat = extractChat(friend);
    setChatBoxes([
      ...chatBoxes,
      { label: friend, children: chat, key: friend },
    ]);
    setMsgSent(true);
    return friend;
  };

  const removeChatBox = (targetKey, activeKey) => {
    const index = chatBoxes.findIndex(({ key }) => key === activeKey);
    const newChatBoxes = chatBoxes.filter(({ key }) => key !== targetKey);
    setChatBoxes(newChatBoxes);
    return activeKey
      ? activeKey === targetKey
        ? index === 0
          ? ""
          : chatBoxes[index - 1].key
        : activeKey
      : "";
  };

  const renderChat = (chat) => {
    return chat.length === 0 ? (
      // Initial or when cleared
      <p style={{ color: "#ccc" }}>No messages...</p>
    ) : (
      // Print each message {name, textBody}
      chat.map(({ name, body }, i) => {
        <Message isMe={name === me} message={body} key={i} />;
      })
    );
  }; // 產生 chat 的 DOM nodes

  const extractChat = (friend) => {
    return renderChat(
      messages.filter(({ name, body }) => name === friend || name === me)
    );
  };

  return (
    <>
      <Title name={me} />
      <>
        <ChatBoxesWrapper
          tabBarStyle={{ height: "36px" }}
          type="editable-card"
          activeKey={activeKey}
          onChange={(key) => {
            setActiveKey(key);
            extractChat(key);
          }}
          onEdit={(targetKey, action) => {
            if (action === "add") setModalOpen(true);
            else if (action === "remove") {
              setActiveKey(removeChatBox(targetKey, activeKey));
            }
          }}
          items={chatBoxes}
        />
        <ChatModal
          open={modalOpen}
          onCreate={({ name }) => {
            setActiveKey(createChatBox(name));
            startChat({me, key});
            setModalOpen(false);
          }}
          onCancel={() => {
            setModalOpen(false);
          }}
        />
      </>
      <Input.Search
        value={msg}
        // ref={msgRef}
        onChange={(e) => setMsg(e.target.value)}
        enterButton="Send"
        placeholder="Type a message here..."
        onSearch={(msg) => {
          if (!msg) {
            displayStatus({
              type: "error",
              msg: "Please enter a message body.",
            });
            return;
          } else if (activeKey === "") {
            displayStatus({
              type: "error",
              msg: "Please add a chatbox first.",
            });
            setMsg("");
            return;
          }
          sendMessage({ name: me, to: activeKey, body: msg });
          setMsg("");
          setMsgSent(true);
        }}
      />
    </>
  );
};

export default ChatRoom;
