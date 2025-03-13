import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let clientPromise;

if (process.env.NODE_ENV === "development") {
  // In development, use a global client so the connection is not repeatedly created during hot reloading
  if (global._mongoClientPromise) {
    clientPromise = global._mongoClientPromise;
  } else {
    global._mongoClientPromise = client.connect();
    clientPromise = global._mongoClientPromise;
  }
} else {
  // In production, it's safe to not use the global client
  clientPromise = client.connect();
}

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { title, content, date, teacherId } = req.body;

    // Ensure all fields are provided
    if (!title || !content || !date || !teacherId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    try {
      const clientConnected = await clientPromise; // Use the global client promise
      const db = clientConnected.db("school_notice_board"); // Specify the database name
      const noticesCollection = db.collection("notices");

      const newNotice = {
        title,
        content,
        date,
        teacherId,
      };

      const result = await noticesCollection.insertOne(newNotice);
      res.status(201).json(result.ops[0]); // Send back the created notice
    } catch (error) {
      res.status(500).json({ message: "Error adding notice", error });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
