import e, { Router } from "express";
import db from "../db";
import ScoreCard from "../models/ScoreCard";

const router = Router();

router.delete("/cards", async (req, res) => {
  try {
    await ScoreCard.deleteMany({});
    res.send({ message: "Database cleared" });
  } catch (e) {
    res.send({ message: "Database deletion failed" });
  }
});

router.post("/card", async (req, res) => {
  let name = req.body.name;
  let subject = req.body.subject;
  let score = parseInt(req.body.score);

  const existing = await ScoreCard.findOne({ name: name, subject: subject });
  if (existing) {
    existing.score = score;
    existing.save();
    res.send({
      message: `Updating (${name}, ${subject}, ${score})`,
      card: existing,
    });
  } else {
    try {
      const newScoreCard = new ScoreCard({ name, subject, score });
      res.send({
        message: `Adding (${name}, ${subject}, ${score})`,
        card: newScoreCard,
      });
      return newScoreCard.save();
    } catch (e) {
      res.send({ message: `Adding failed` });
    }
  }
});

router.get("/cards", async (req, res) => {
  let type = req.query.type;
  let queryString = req.query.queryString;

  if (type == "name") {
    const existing = await ScoreCard.find({ name: queryString });
    if (existing.length != 0) {
      let messages = existing.map((item) => {
        return `Found card with name: (${item.name}, ${item.subject}, ${item.score})`;
      });
      res.send({ messages: messages });
    } else {
      res.send({ message: `Name (${queryString}) not found!` });
    }
  } else {
    const existing = await ScoreCard.find({ subject: queryString });
    if (existing.length != 0) {
      let messages = existing.map((item) => {
        return `Found card with subject: (${item.name}, ${item.subject}, ${item.score})`;
      });
      res.send({ messages: messages });
    } else {
      res.send({ message: `Subject (${queryString}) not found!` });
    }
  }
});

export default router;
