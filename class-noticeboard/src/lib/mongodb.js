import { MongoClient } from "mongodb";

// Get the MongoDB URI from environment variables (use the database name `school_notice_board` here)
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

clientPromise
  .then((client) => {
    const db = client.db("school_notice_board"); // Connect to the school_notice_board database
    console.log("Connected to the school_notice_board database!");
  })
  .catch((error) => console.error("MongoDB connection error:", error));

export default clientPromise;
