
const cors = require("cors");
const express = require("express");
const { randomUUID } = require("node:crypto");

const app = express();
const PORT = 5000;

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "AI Software Engineering Assistant API is running",
  });
});

app.post("/api/tasks", (req, res) => {
  const { task } = req.body;

  if (typeof task !== "string" || !task.trim()) {
    return res.status(400).json({
      success: false,
      message: "A valid task is required.",
    });
  }

  const requestId = randomUUID();

  res.status(201).json({
    success: true,
    requestId,
    status: "received",
    createdAt: new Date().toISOString(),
    message: "Task received successfully.",
    task: task.trim(),
  });
});

app.listen(PORT, () => {
  console.log(`Backend server running at http://localhost:${PORT}`);
});
