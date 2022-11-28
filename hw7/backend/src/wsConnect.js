import { UserModel, MessageModel, ChatBoxModel } from "./models/chatbox";

const makeName = (name, to) => {
  return [name, to].sort().join("_");
};
const validateUser = async (name) => {
  const existing = await UserModel.findOne({ name: name });
  if (!existing) return false;
  else {
    return existing;
  }
};
const validateBox = async (name) => {
  const existing = await ChatBoxModel.findOne({ name: name });
  if (!existing) return false;
  else {
    return existing;
  }
};
const chatBoxes = {};

const sendData = (data, ws) => {
  ws.send(JSON.stringify(data));
};
const sendStatus = (payload, ws) => {
  sendData(["status", payload], ws);
};

export default {
  onMessage: (wss, ws) => async (byteString) => {
    const { data } = byteString;
    const parseData = JSON.parse(data);
    const task = parseData.type;
    const payload = parseData.payload;
    switch (task) {
      case "CHAT": {
        const { name, to } = payload;
        const chatBoxName = makeName(name, to);
        // 如果不曾有過 chatBoxName 的對話，將 chatBoxes[chatBoxName] 設定為 empty Set
        if (!chatBoxes[chatBoxName]) chatBoxes[chatBoxName] = new Set(); // make new record for chatbox
        // 將 ws client 加入 chatBoxes[chatBoxName]
        chatBoxes[chatBoxName].add(ws);
        // check if chat Box exist
        let cBox = await validateBox(chatBoxName);
        if (cBox === false) {
          cBox = new ChatBoxModel({
            name: chatBoxName,
            messages: [],
            users: [],
          });
        }
        // check if to users exist
        let s = await validateUser(name);
        let r = await validateUser(to);
        if (s === false) {
          s = new UserModel({
            name: name,
            chatboxes: cBox._id,
          });
          try {
            await s.save();
            console.log("save sender success");
          } catch (e) {
            throw new Error("DB save error: " + e);
          }
        }
        if (r === false) {
          r = new UserModel({
            name: to,
            chatboxes: cBox._id,
          });
          try {
            await r.save();
            console.log("save reciever success");
          } catch (e) {
            throw new Error("DB save error: " + e);
          }
        }
        // add user to chat box
        cBox.users = [s._id, r._id];
        try {
          await cBox.save();
          console.log("save chatbox success");
        } catch (e) {
          throw new Error("DB save error: " + e);
        }
        // populate chat box
        await cBox.populate("messages");
        cBox.populated("messages");
        await cBox.populate("messages.sender");
        cBox.populated("messages.sender");
        // create message array
        var mesArr = [];
        for (var i = 0; i < cBox.messages.length; i++) {
          cBox.messages[i].populate("sender");
          mesArr.push({
            name: cBox.messages[i].sender.name,
            body: cBox.messages[i].body,
          });
        }
        sendData(["CHAT", mesArr], ws);
        break;
      }
      case "MESSAGE": {
        const { name, to, body } = payload;
        const chatBoxName = makeName(name, to);
        // check if chat Box exist
        let cBox = await validateBox(chatBoxName);
        // check if to users exist
        let s = await validateUser(name);
        // create message
        const message = new MessageModel({
          chatBox: cBox._id,
          sender: s._id,
          body: body,
        });
        cBox.messages.push(message._id);
        try {
          await message.save();
          console.log("save message success");
        } catch (e) {
          throw new Error("Message DB save error: " + e);
        }
        try {
          await cBox.save();
          console.log("save chatbox success");
        } catch (e) {
          throw new Error("Message DB save error: " + e);
        }
        // return data to fontend
        chatBoxes[chatBoxName].forEach((client) => {
          sendData(["MESSAGE", { name: name, body: body }], client);
          sendStatus({ type: "success", msg: "Message sent." }, client);
        });
        break;
      }
      default:
        break;
    }
  },
};
