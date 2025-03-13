import { ObjectId } from "mongodb";
import clientPromise from "../../../lib/mongodb";

export default async function handler(req, res) {
  const { id } = req.query;
  const client = await clientPromise;
  const db = client.db();
  const noticesCollection = db.collection("notices");

  switch (req.method) {
    case "DELETE":
      // Delete a specific notice
      try {
        const result = await noticesCollection.deleteOne({
          _id: new ObjectId(id),
        });
        if (result.deletedCount === 1) {
          res.status(200).json({ message: "Notice deleted successfully" });
        } else {
          res.status(404).json({ message: "Notice not found" });
        }
      } catch (error) {
        res.status(500).json({ message: "Error deleting notice", error });
      }
      break;

    default:
      res.status(405).json({ message: "Method not allowed" });
      break;
  }
}
