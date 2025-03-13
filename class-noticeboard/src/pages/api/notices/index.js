import clientPromise from "../../../lib/mongodb";
import { ObjectId } from "mongodb"; // Import ObjectId for use in delete operation

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("school_notice_board"); // Specify the database name
  const noticesCollection = db.collection("notices");

  switch (req.method) {
    case "GET":
      // Fetch all notices
      try {
        const notices = await noticesCollection
          .find({})
          .sort({ date: -1 }) // Sorting by date, latest first
          .toArray();
        res.status(200).json(notices);
      } catch (error) {
        res.status(500).json({ message: "Error fetching notices", error });
      }
      break;

    case "POST":
      // Post a new notice
      const newNotice = req.body;
      try {
        const result = await noticesCollection.insertOne(newNotice);
        res.status(201).json(result.ops[0]); // Send back the created notice
      } catch (error) {
        res.status(500).json({ message: "Error posting notice", error });
      }
      break;

    case "DELETE":
      // Delete old notices (admin only)
      const { id } = req.body; // Notice ID is expected in the body
      try {
        const result = await noticesCollection.deleteOne({
          _id: new ObjectId(id), // Convert string ID to ObjectId for deletion
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
