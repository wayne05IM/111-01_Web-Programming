import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { Tabs, Input } from "antd";
import { useChat } from "./hook/useChat";
import Title from "../components/Title";
import Message from "../components/Message";
import ChatModal from "../components/ChatModal";

import { useQuery, useMutation, useLazyQuery } from "@apollo/client";
import {
  CHATBOX_QUERY,
  CREATE_CHATBOX_MUTATION,
  MESSAGE_SUBSCRIPTION,
  CREATE_MESSAGE_MUTATION,
} from "../graqhql";

const ChatBoxesWrapper = styled(Tabs)`
  width: 100%;
  height: 300px;
  background: #eeeeee52;
  border-radius: 10px;
  margin: 20px;
  padding: 20px;
`;
const ChatBoxWrapper = styled.div`
  width: 100%;
  height: 204px;
  display: flex;
  flex-direction: column;
  overflow: auto;
`;
const FootRef = styled.div`
  height: 20px;
`;

const ChatRoom = () => {
  const { me, messages, startChat, sendMessage, displayStatus, setMessages } =
    useChat();
  const [subcriptTrigger, setSubcriptTrigger] = useState(false);
  const [chatBoxes, setChatBoxes] = useState([]);
  const [activeKey, setActiveKey] = useState("");
  const [msg, setMsg] = useState("");
  const [msgSent, setMsgSent] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  //const msgRef = useRef(null)
  const msgFooter = useRef(null);
  const actk = useRef(null);

  const makeName = (name, to) => {
    return [name, to].sort().join("_");
  };

  const scrollToBottom = () => {
    msgFooter.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  let [getData, { data, loading, subscribeToMore }] =
    useLazyQuery(CHATBOX_QUERY);

  const loadData = async () => {
    let temp = await getData({
      variables: {
        name1: me,
        name2: activeKey,
      },
    });
    data = temp.data;
    loading = temp.loading;
  };

  useEffect(() => {
    if (activeKey != "" && subcriptTrigger === true) {
      try {
        subscribeToMore({
          document: MESSAGE_SUBSCRIPTION,
          variables: { from: me, to: activeKey },
          updateQuery: (previous, { subscriptionData }) => {
            if (!subscriptionData.data) {
              return previous;
            }

            const newMessage = {
              sender: subscriptionData.data.message.sender,
              body: subscriptionData.data.message.body,
            };

            let msglist = [...messages, newMessage];
            if (previous.chatBox && actk.current === activeKey) {
              setMessages([...previous.chatBox.messages, newMessage]);
              msglist = [...previous.chatBox.messages, newMessage];
            } else setMessages([...messages, newMessage]);
            actk.current = activeKey;
            return {
              chatBox: {
                name: makeName(me, activeKey),
                messages: msglist,
              },
            };
          },
        });
      } catch (e) {}
    }
  }, [subscribeToMore, subcriptTrigger]);

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

  const displayChat = (chat) =>
    chat.length === 0 ? (
      <p style={{ color: "#ccc" }}> No messages... </p>
    ) : (
      <ChatBoxWrapper>
        {chat.map(({ sender, body }, i) => (
          <Message name={sender} isMe={sender === me} message={body} key={i} />
        ))}
        <FootRef ref={msgFooter}></FootRef>
      </ChatBoxWrapper>
    );

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

  const extractChat = (friend) => {
    return displayChat(
      messages.filter(({ sender, body }) => sender === friend || sender === me)
    );
  };

  useEffect(() => {
    const index = chatBoxes.findIndex(({ key }) => key === activeKey);
    if (index != -1) {
      var thisBox = chatBoxes[index];
      const chat = extractChat(activeKey);
      thisBox.children = chat;
      let newChatBoxes = [];
      for (var i = 0; i < chatBoxes.length; i++) {
        if (i === index) newChatBoxes.push(thisBox);
        else newChatBoxes.push(chatBoxes[i]);
      }
      setChatBoxes(newChatBoxes);
    }
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    scrollToBottom();
    setMsgSent(false);
  }, [msgSent]);

  useEffect(() => {
    scrollToBottom();
  }, [chatBoxes]);

  return (
    <>
      <Title name={me} />
      <ChatBoxesWrapper
        tabBarStyle={{ height: "36px" }}
        type="editable-card"
        activeKey={activeKey}
        onChange={async (key) => {
          setActiveKey(key);
          const temp = await startChat({
            variables: { name1: me, name2: key },
          });
          setMessages(temp.data.createChatBox.messages);
          await subscribeToMore();
          setSubcriptTrigger(true);
          await loadData();
          setSubcriptTrigger(false);
          extractChat(key);
        }}
        onEdit={(targetKey, action) => {
          if (action === "add") setModalOpen(true);
          else if (action === "remove") {
            setActiveKey(removeChatBox(targetKey, activeKey));
          }
        }}
        items={chatBoxes}
      ></ChatBoxesWrapper>
      <ChatModal
        open={modalOpen}
        onCreate={async ({ name }) => {
          setActiveKey(createChatBox(name));
          const te = await startChat({ variables: { name1: me, name2: name } });
          setMessages(te.data.createChatBox.messages);
          setSubcriptTrigger(true);
          await loadData();
          setSubcriptTrigger(false);
          extractChat(name);
          setModalOpen(false);
        }}
        onCancel={() => {
          setModalOpen(false);
        }}
      />
      <Input.Search
        value={msg}
        onChange={(e) => {
          setMsg(e.target.value);
        }}
        enterButton=" Send"
        placeholder="Type a message here..."
        onSearch={async (msg) => {
          if (!msg) {
            displayStatus({
              type: "error",
              msg: "Please enter a username and a message body.",
            });
            return;
          }
          let ms = await sendMessage({
            variables: { name: me, to: activeKey, body: msg },
          });
          setMsg("");
          setMsgSent(true);
        }}
      ></Input.Search>
    </>
  );
};
export default ChatRoom;
