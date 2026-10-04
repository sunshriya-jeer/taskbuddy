const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { getTasks, getTaskById, createTask, updateTask, deleteTask } = require("../controllers/taskController");

// Protect all task routes with authMiddleware
router.use(authMiddleware);

// GET /api/tasks
router.get("/", getTasks);

// GET /api/tasks/:id
router.get("/:id", getTaskById);

// POST /api/tasks
router.post("/", createTask);

// PUT /api/tasks/:id
router.put("/:id", updateTask);

// DELETE /api/tasks/:id
router.delete("/:id", deleteTask);

module.exports = router;
