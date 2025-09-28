// server.js
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

let announcements = [];
let nextId = 1;

// GET all announcements
app.get("/announcements", (req, res) => {
  res.json(announcements);
});

// POST new announcement
app.post("/announcements", (req, res) => {
  const { title, description } = req.body;
  if (!title) return res.status(400).json({ message: "Title is required" });

  const newAnnouncement = {
    id: nextId++,
    title,
    description: description || "",
    status: "active",
    reactions: {},
    comments: [],
    createdAt: new Date().toISOString(), // ✅ set createdAt
    closedAt: null, // initially null
  };

  announcements.unshift(newAnnouncement);
  res.json(newAnnouncement);
});

// PATCH announcement (update status)
app.patch("/announcements/:id", (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const announcement = announcements.find((a) => a.id == id);

  if (!announcement)
    return res.status(404).json({ message: "Announcement not found" });

  announcement.status = status;
  if (status === "closed") announcement.closedAt = new Date().toISOString(); // ✅ set closedAt
  if (status === "active") announcement.closedAt = null; // optional: reset if re-activated

  res.json(announcement);
});

// POST reaction
app.post("/announcements/:id/reactions", (req, res) => {
  const { id } = req.params;
  const { type } = req.body;
  const announcement = announcements.find((a) => a.id == id);

  if (!announcement)
    return res.status(404).json({ message: "Announcement not found" });

  announcement.reactions[type] = (announcement.reactions[type] || 0) + 1;
  res.json(announcement);
});

// POST comment
app.post("/announcements/:id/comments", (req, res) => {
  const { id } = req.params;
  const { authorName, text } = req.body;

  if (!text) return res.status(400).json({ message: "Comment text required" });

  const announcement = announcements.find((a) => a.id == id);
  if (!announcement)
    return res.status(404).json({ message: "Announcement not found" });

  const newComment = {
    id: Date.now(),
    authorName: authorName || "Anonymous",
    text,
  };

  announcement.comments.unshift(newComment);
  res.json(newComment);
});

// Start server
const PORT = 4000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
