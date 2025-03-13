import { notices } from "../../../data/notices"; // This is a mock data file you can create for the sake of this example.

export default function handler(req, res) {
  switch (req.method) {
    case "GET":
      // Fetch all notices
      res.status(200).json(notices);
      break;

    case "POST":
      // Post a new notice
      const newNotice = req.body;
      newNotice.id = notices.length + 1; // Generate an ID for the notice
      notices.push(newNotice);
      res.status(201).json(newNotice);
      break;

    case "DELETE":
      // Delete old notices (admin only)
      const noticeId = req.body.id;
      const updatedNotices = notices.filter((notice) => notice.id !== noticeId);
      if (updatedNotices.length !== notices.length) {
        res.status(200).json({ message: "Notice deleted successfully" });
      } else {
        res.status(404).json({ message: "Notice not found" });
      }
      break;

    default:
      res.status(405).json({ message: "Method not allowed" });
      break;
  }
}
