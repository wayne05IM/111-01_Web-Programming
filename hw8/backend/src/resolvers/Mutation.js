const makeName = (name, to) => {
  return [name, to].sort().join("_");
};
const checkOutChatBox = async (name1, name2, ChatBoxModel) => {
  let name = makeName(name1, name2);
  let box = await ChatBoxModel.findOne({ name });
  if (!box) box = await new ChatBoxModel({ name }).save();
  return box;
};
const Mutation = {
  createChatBox: async (parent, { name1, name2 }, { ChatBoxModel }) => {
    console.log("start create");
    return await checkOutChatBox(name1, name2, ChatBoxModel);
  },
  createMessage: async (
    parent,
    { name, to, body },
    { ChatBoxModel, pubsub }
  ) => {
    const chatBox = await checkOutChatBox(name, to, ChatBoxModel);
    const newMsg = { sender: name, body };
    chatBox.messages.push(newMsg);
    await chatBox.save();

    const chatBoxName = makeName(name, to);
    pubsub.publish(`chatBox ${chatBoxName}`, {
      message: newMsg,
    });
    return newMsg;
  },
};

export { Mutation as default };
