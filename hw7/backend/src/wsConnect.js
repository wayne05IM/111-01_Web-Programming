// import Message from "./models/message.js";
import { MessageModel, UserModel, ChatBoxModel } from "./models/chatbox";

const makeName = (name, to) => {
  return [name, to].sort().join("_");
};

const validateUser = async (name, id) => {
  const existing = await UserModel.findOne({ name: name });
  if (!existing)
    existing = await new UserModel({ name: name, chatboxes: id }).save();
  return existing;
};

const validateChatBox = async (name, participants) => {
  const box = await ChatBoxModel.findOne({ name: name });
  if (!box) box = await new ChatBoxModel({ name, users: participants }).save();
  return box.populate(["users", { path: "messages", populate: "sender" }]);
};

const chatBoxes = {};

const sendData = (data, ws) => {
  ws.send(JSON.stringify(data));
};

const sendStatus = (payload, ws) => {
  sendData(["status", payload], ws);
};

// Broadcast function
// const broadcastMessage = (data, status, wss) => {
//   wss.clients.forEach((client) => {
//     sendData(data, client);
//     sendStatus(status, client);
//   });
// };

const onMessage = (wss, ws) => {
  async (byteString) => {
    console.log(byteString);
    const { data } = byteString;
    const [task, payload] = JSON.parse(data);
    console.log(task);
    switch (task) {
      case "CHAT": {
        const { name, to } = payload;
        console.log(name, to);
        const chatBoxName = makeName(name, to);
        // 如果不曾有過 chatBoxName 的對話，將 chatBoxes[chatBoxName] 設定為 empty Set
        if (!chatBoxes[chatBoxName]) chatBoxes[chatBoxName] = new Set(); // make new record for chatbox
        // 將 ws client 加入 chatBoxes[chatBoxName]
        chatBoxes[chatBoxName].add(ws); // add this open connection into chatbox
        // Both user exist or not
        let s = await validateUser(name);
        let r = await validateUser(to);
        // Box exist or not
        let cBox = await validateChatBox(chatBoxName, [s._id, dest._id]);
        //
        var mes = [];
        for (var i = 0; i < cBox.messages.length; i++) {
          cBox.messages[i].populate("sender");
          mes.push({
            name: cBox.messages[i].sender.name,
            body: cBox.messages[i].body,
          });
        }
        // console.log(mes);
        // send data
        sendData(["CHAT", mes], ws);
        break;
      }
      case "MESSAGE": {
        const { name, to, body } = payload;
        console.log(name, to, body);
        const chatBoxName = makeName(name, to);
        let s = await validateUser(name);
        const cBox = await validateChatBox(chatBoxName, [name, to]);
        const message = new MessageModel({
          chatBox: cBox._id,
          sender: a._id,
          body: body,
        });
        cBox.messages.push(message._id);
        try {
          await message.save();
          console.log("save success");
        } catch (e) {
          throw new Error("Message DB save error: " + e);
        }
        try {
          await cBox.save();
          console.log("save success");
        } catch (e) {
          throw new Error("Message DB save error: " + e);
        }
        chatBoxes[chatBoxName].forEach((client) => {
          sendData(["MESSAGE", { name: name, body: body }], client);
          sendStatus({ type: "success", msg: "Message sent." }, client);
          //console.log(client)
        });
        break;
      }
      // case "clear": {
      //   Message.deleteMany({}, () => {
      //     broadcastMessage(["cleared"], {
      //       type: "info",
      //       msg: "Message cache cleared",
      //     });
      //   });
      // }
      default:
        break;
    }
  };
};

export {onMessage};
