let users = [
  { id: 1, username: "admin", role: "admin" },
  { id: 2, username: "teacher1", role: "teacher" },
  { id: 3, username: "student1", role: "student" },
];

export default function handler(req, res) {
  switch (req.method) {
    case "GET":
      // List all users
      res.status(200).json(users);
      break;

    case "POST":
      // Add a new user
      const { username, role } = req.body;
      const newUser = { id: users.length + 1, username, role };
      users.push(newUser);
      res.status(201).json(newUser);
      break;

    default:
      res.status(405).json({ message: "Method not allowed" });
      break;
  }
}
