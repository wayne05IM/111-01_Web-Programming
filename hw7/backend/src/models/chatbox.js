import mongoose from "mongoose";

const { Schema } = mongoose;

/******* User Schema *******/
const UserSchema = new Schema({
  name: { type: String, required: [true, "Name field is required."] },
  chatBoxes: [{ type: mongoose.Types.ObjectId, ref: "ChatBox" }],
});
const UserModel = mongoose.model("User", UserSchema);

/******* Message Schema *******/
const MessageSchema = new Schema({
  chatBox: { type: mongoose.Types.ObjectId, ref: "ChatBox" },
  sender: { type: mongoose.Types.ObjectId, ref: "User" },
  body: { type: String, required: [true, "Body field is required."] },
});
const MessageModel = mongoose.model("Message", MessageSchema);

/******* ChatBox Schema *******/
const ChatBoxSchema = new Schema({
  name: { type: String, required: [true, "Name field is required."] },
  users: [{ type: mongoose.Types.ObjectId, ref: "User" }],
  messages: [{ type: mongoose.Types.ObjectId, ref: "Message" }],
});
const ChatBoxModel = mongoose.model("ChatBox", ChatBoxSchema);

export { UserModel, MessageModel, ChatBoxModel};


// import mongoose from 'mongoose';

// const Schema = mongoose.Schema
// // Creating a schema, sort of like working with an ORM
// const MessageSchema = new Schema({
//   name: {
//     type: String,
//     required: [true, 'Name field is required.']
// }, body: {
//     type: String,
//     required: [true, 'Body field is required.']
//   }
// })
// // Creating a table within database with the defined schema
// const Message = mongoose.model('message', MessageSchema)
// // Exporting table for querying and mutating
// export default Message;