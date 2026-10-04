const supabase = require("../config/supabase");

// @desc    Get all tasks for authenticated user
// @route   GET /api/tasks
const getTasks = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .eq("user_id", req.user.id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching tasks:", error.message);
      return res.status(500).json({
        success: false,
        message: "Failed to fetch tasks"
      });
    }

    return res.status(200).json({
      success: true,
      data: data
    });
  } catch (err) {
    console.error("Unexpected error fetching tasks:", err.message);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch tasks"
    });
  }
};

// @desc    Create a new task for authenticated user
// @route   POST /api/tasks
const createTask = async (req, res) => {
  try {
    const { title, description, priority, status, category, dueDate } = req.body;

    // Validate title
    if (!title || typeof title !== "string" || !title.trim()) {
      return res.status(400).json({
        success: false,
        message: "Title is required"
      });
    }

    // Validate priority
    const validPriorities = ["Low", "Medium", "High"];
    if (!priority || !validPriorities.includes(priority)) {
      return res.status(400).json({
        success: false,
        message: "Priority must be one of: Low, Medium, High"
      });
    }

    // Validate status
    const validStatuses = ["Pending", "In Progress", "Completed"];
    if (!status || !validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Status must be one of: Pending, In Progress, Completed"
      });
    }

    // Prepare task data (mapping dueDate to due_date and attaching authenticated user_id)
    const taskData = {
      user_id: req.user.id,
      title: title.trim(),
      description: description || null,
      priority,
      status,
      category: category || null,
      due_date: dueDate && typeof dueDate === "string" && dueDate.trim() !== "" ? dueDate : null
    };

    const { data, error } = await supabase
      .from("tasks")
      .insert([taskData])
      .select()
      .single();

    if (error) {
      console.error("Error creating task:", error.message);
      return res.status(500).json({
        success: false,
        message: "Failed to create task"
      });
    }

    return res.status(201).json({
      success: true,
      data: data
    });
  } catch (err) {
    console.error("Unexpected error creating task:", err.message);
    return res.status(500).json({
      success: false,
      message: "Failed to create task"
    });
  }
};

// @desc    Get task by ID for authenticated user
// @route   GET /api/tasks/:id
const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .eq("id", id)
      .eq("user_id", req.user.id)
      .maybeSingle();

    if (error) {
      console.error("Error fetching task:", error.message);
      return res.status(500).json({
        success: false,
        message: "Failed to fetch task"
      });
    }

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Task not found"
      });
    }

    return res.status(200).json({
      success: true,
      data: data
    });
  } catch (err) {
    console.error("Unexpected error fetching task:", err.message);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch task"
    });
  }
};

// @desc    Update a task for authenticated user
// @route   PUT /api/tasks/:id
const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, priority, status, category, dueDate } = req.body;

    // Validate title
    if (!title || typeof title !== "string" || !title.trim()) {
      return res.status(400).json({
        success: false,
        message: "Title is required"
      });
    }

    // Validate priority
    const validPriorities = ["Low", "Medium", "High"];
    if (priority !== undefined && !validPriorities.includes(priority)) {
      return res.status(400).json({
        success: false,
        message: "Priority must be one of: Low, Medium, High"
      });
    }

    // Validate status
    const validStatuses = ["Pending", "In Progress", "Completed"];
    if (status !== undefined && !validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Status must be one of: Pending, In Progress, Completed"
      });
    }

    // Prepare update data (mapping dueDate to due_date)
    const updateData = {
      title: title.trim(),
      updated_at: new Date().toISOString()
    };

    if (description !== undefined) {
      updateData.description = description || null;
    }

    if (priority !== undefined) {
      updateData.priority = priority;
    }

    if (status !== undefined) {
      updateData.status = status;
    }

    if (category !== undefined) {
      updateData.category = category || null;
    }

    if (dueDate !== undefined) {
      updateData.due_date = dueDate && typeof dueDate === "string" && dueDate.trim() !== "" ? dueDate : null;
    }

    const { data, error } = await supabase
      .from("tasks")
      .update(updateData)
      .eq("id", id)
      .eq("user_id", req.user.id)
      .select()
      .maybeSingle();

    if (error) {
      console.error("Error updating task:", error.message);
      return res.status(500).json({
        success: false,
        message: "Failed to update task"
      });
    }

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Task not found"
      });
    }

    return res.status(200).json({
      success: true,
      data: data
    });
  } catch (err) {
    console.error("Unexpected error updating task:", err.message);
    return res.status(500).json({
      success: false,
      message: "Failed to update task"
    });
  }
};

// @desc    Delete a task for authenticated user
// @route   DELETE /api/tasks/:id
const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from("tasks")
      .delete()
      .eq("id", id)
      .eq("user_id", req.user.id)
      .select()
      .maybeSingle();

    if (error) {
      console.error("Error deleting task:", error.message);
      return res.status(500).json({
        success: false,
        message: "Failed to delete task"
      });
    }

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Task not found"
      });
    }

    return res.status(200).json({
      success: true,
      data: data,
      message: "Task deleted successfully"
    });
  } catch (err) {
    console.error("Unexpected error deleting task:", err.message);
    return res.status(500).json({
      success: false,
      message: "Failed to delete task"
    });
  }
};

module.exports = {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask
};
