// import "./App.css";
// import { Button, Input, message, Tag } from "antd";
// import { useRef, useState, useEffect } from "react";
// import useChat from "./hooks/useChat";
// import styled from "styled components";

import ChatRoom from "./ChatRoom";
import styled from "styled-components";
import { useChat } from "./hooks/useChat";
import { useEffect } from "react";
import SignIn from "./SignIn";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 500px;
  margin: auto;
`;

const App = () => {
  const { status, me, signedIn, displayStatus } = useChat();
  useEffect(() => {
    displayStatus(status);
  }, [status]);
  return <Wrapper> {signedIn ? <ChatRoom /> : <SignIn me={me} />} </Wrapper>;
};

// const App = () => {
//   // Define states and methods
//   const { status, messages, sendMessage, clearMessages } = useChat();
//   const [userName, setUserName] = useState("");
//   const [body, setBody] = useState("");
//   const bodyRef = useRef(null);

//   const [login, setLogin] = useState(false);
//   const [me, setMe] = useState("");

//   const displayStatus = (payload) => {
//     if (payload.msg) {
//       const { type, msg } = payload;
//       const content = {
//         content: msg,
//         duration: 0.5,
//       };
//       switch (type) {
//         case "success": {
//           message.success(content);
//           break;
//         }
//         case "error": {
//           message.error(content);
//           break;
//         }
//         default:
//           break;
//       }
//     }
//   };

//   useEffect(() => {
//     displayStatus(status);
//   }, [status]);

//   // if (login) {
//   return (
//     <div className="App">
//       <div className="App-title">
//         <h1>{me}'s Chat Room</h1>
//         <Button type="primary" danger onClick={clearMessages}>
//           Clear
//         </Button>
//       </div>
//       <div className="App-messages">
//         {messages.length === 0 ? (
//           // Initial or when cleared
//           <p style={{ color: "#ccc" }}>No messages...</p>
//         ) : (
//           // Print each message {name, textBody}
//           messages.map(({ name, body }, i) => {
//             return (
//               <p className="App-message" key={i}>
//                 <Tag color="blue">{name}</Tag> {body}
//               </p>
//             );
//           })
//         )}
//       </div>
//       <Input.Search
//         // Set ref
//         ref={bodyRef}
//         // Save and store the text body
//         value={body}
//         onChange={(e) => {
//           setBody(e.target.value);
//         }}
//         enterButton="Send"
//         placeholder="Type a message here..."
//         // When "Send", call sendMessage()
//         onSearch={(msg) => {
//           if (!msg) {
//             displayStatus({
//               type: "error",
//               msg: "Please enter a message body",
//             });
//             return;
//           }
//           sendMessage({ name: userName, body: msg });
//           setBody("");
//         }}
//       ></Input.Search>
//     </div>
//   );
//   // } else {
//   //   return (
//   //     <div className="App">
//   //       <div className="App-title">
//   //         <h1>Log In to Chat Room</h1>
//   //       </div>
//   //       <div style={{ height: "50px" }}></div>
//   //       <Input.Search
//   //         enterButton="Sign In"
//   //         placeholder="Enter username"
//   //         onChange={(e) => {
//   //           setUserName(e.target.value);
//   //         }}
//   //         onSearch={(msg) => {
//   //           if (!msg) {
//   //             displayStatus({
//   //               type: "error",
//   //               msg: "Please enter a username",
//   //             });
//   //             return;
//   //           }
//   //           setMe(msg);
//   //           setLogin(true);
//   //         }}
//   //       ></Input.Search>
//   //     </div>
//   //   );
//   // }
// };

export default App;
