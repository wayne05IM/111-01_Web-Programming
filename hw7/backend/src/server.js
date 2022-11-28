import http from "http";
import express from "express";
import mongoose from "mongoose";
import WebSocket from "ws";
import { v4 as uuidv4 } from "uuid";

import mongo from "./mongo.js";
import wsConnect from "./wsConnect";

mongo.connect();

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const db = mongoose.connection;
db.once("open", () => {
  wss.on("connection", (ws) => {
    ws.id = uuidv4();
    ws.box = "";
    ws.onmessage = wsConnect.onMessage(wss, ws);
  });

  const PORT = process.env.PORT || 4000;
  server.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
  });
});
