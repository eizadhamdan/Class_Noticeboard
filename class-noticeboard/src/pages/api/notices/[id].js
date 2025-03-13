import { notices } from "../../../data/notices"; // Mock data

export default function handler(req, res) {
  const { id } = req.query;

  switch (req.method) {
    case "DELETE":
      // Delete a specific notice
      const index = notices.findIndex((notice) => notice.id === parseInt(id));
      if (index !== -1) {
        notices.splice(index, 1);
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
