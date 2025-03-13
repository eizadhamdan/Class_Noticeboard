import { ObjectId } from "mongodb";
import clientPromise from "../../../lib/mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("school_notice_board"); // Specify the database name
  const usersCollection = db.collection("users");

  switch (req.method) {
    case "GET":
      // List all users
      try {
        const users = await usersCollection.find({}).toArray();
        res.status(200).json(users); // Return the users list
      } catch (error) {
        res.status(500).json({ message: "Error fetching users", error });
      }
      break;

    case "POST":
      // Add a new user
      const { username, role } = req.body;
      try {
        const result = await usersCollection.insertOne({ username, role });
        res.status(201).json(result.ops[0]); // Return the newly added user
      } catch (error) {
        res.status(500).json({ message: "Error adding user", error });
      }
      break;

    case "DELETE":
      // Delete a user by ID
      const { id } = req.body; // Expect the ID in the request body
      try {
        const result = await usersCollection.deleteOne({
          _id: new ObjectId(id), // Convert the ID to MongoDB's ObjectId
        });

        if (result.deletedCount === 1) {
          res.status(200).json({ message: "User deleted successfully" });
        } else {
          res.status(404).json({ message: "User not found" });
        }
      } catch (error) {
        res.status(500).json({ message: "Error deleting user", error });
      }
      break;

    default:
      res.status(405).json({ message: "Method not allowed" });
      break;
  }
}
