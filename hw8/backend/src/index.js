import server from './server'

// import http from "http";
// import express from "express";
// import mongoose from "mongoose";
// import WebSocket from "ws";
// import { v4 as uuidv4 } from "uuid";
// import wsConnect from './wsConnect'

import mongo from "./mongo";

mongo.connect();

// const app = express();
// const server = http.createServer(app);
// const wss = new WebSocket.Server({ server });

// const db = mongoose.connection;
// db.once("open", () => {
//   wss.on("connection", (ws) => {
//     ws.id = uuidv4();
//     ws.box = "";
//     ws.onmessage = wsConnect.onMessage(wss, ws);
//   });

//   const PORT = process.env.PORT || 4000;
//   server.listen(PORT, () => {
//     console.log(`Listening on http://localhost:${PORT}`);
//   });
// });

const PORT = process.env.PORT || 5001;
server.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
