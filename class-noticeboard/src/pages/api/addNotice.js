// pages/api/addNotice.js
import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { title, content, date, teacherId } = req.body;

    try {
      const clientConnected = await client.connect();
      const db = clientConnected.db();
      const noticesCollection = db.collection("notices");

      const newNotice = {
        title,
        content,
        date,
        teacherId,
      };

      const result = await noticesCollection.insertOne(newNotice);

      res.status(201).json(result.ops[0]);
    } catch (error) {
      res.status(500).json({ message: "Error adding notice", error });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
