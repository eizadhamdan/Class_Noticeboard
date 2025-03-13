import { ObjectId } from "mongodb";
import clientPromise from "../../../lib/mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db();
  const usersCollection = db.collection("users");

  switch (req.method) {
    case "GET":
      // List all users
      try {
        const users = await usersCollection.find({}).toArray();
        res.status(200).json(users);
      } catch (error) {
        res.status(500).json({ message: "Error fetching users", error });
      }
      break;

    case "POST":
      // Add a new user
      const { username, role } = req.body;
      try {
        const result = await usersCollection.insertOne({ username, role });
        res.status(201).json(result.ops[0]);
      } catch (error) {
        res.status(500).json({ message: "Error adding user", error });
      }
      break;

    default:
      res.status(405).json({ message: "Method not allowed" });
      break;
  }
}
