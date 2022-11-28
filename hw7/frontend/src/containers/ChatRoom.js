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

const ChatBoxWrapper = styled.div`
  height: calc(240px - 36px);
  display: flex;
  flex-direction: column;
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

  const updateChatBoxes = (index, children) => {
    const newChatBoxes = chatBoxes.map((msg, i) => {
      if (i === index) {
        return { label: activeKey, key: activeKey, children: children };
      } else {
        return msg;
      }
    });
    setChatBoxes(newChatBoxes);
  };

  useEffect(() => {
    updateChatBoxes(
      chatBoxes.findIndex((msg) => msg.key === activeKey),
      renderChat(messages)
    );
    setMsgSent(true);
  }, [messages]);

  const createChatBox = (friend) => {
    if (chatBoxes.some(({ key }) => key === friend)) {
      throw new Error(friend + "'s chat box has already opened.");
    }
    startChat(me, friend);
    setChatBoxes([
      ...chatBoxes,
      { label: friend, children: renderChat(messages), key: friend },
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
      <p style={{ color: "#ccc" }}> No messages... </p>
    ) : (
      <ChatBoxWrapper>
        {chat.map((item) => (
          <Message isMe={item["name"] === me} message={item["body"]} />
        ))}
        <FootRef ref={msgFooter} />
      </ChatBoxWrapper>
    );
  };

  const extractChat = (friend) => {
    return renderChat(
      messages.filter((m) => m["name"] === friend || m["name"] === me)
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
            startChat(me, key);
          }}
          onEdit={(targetKey, action) => {
            if (action === "add") setModalOpen(true);
            else if (action === "remove") {
              setActiveKey(removeChatBox(targetKey, activeKey));
              // startChat(me, removeChatBox(targetKey, activeKey));
            }
          }}
          items={chatBoxes}
        />
        <ChatModal
          open={modalOpen}
          onCreate={({ name }) => {
            setActiveKey(createChatBox(name));
            extractChat(name);
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
          sendMessage(me, activeKey, msg);
          setMsgSent(true);
          setMsg("");
        }}
      />
    </>
  );
};

export default ChatRoom;
