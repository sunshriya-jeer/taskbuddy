const API_BASE_URL = "http://localhost:5000/api"

/**
 * Normalizes a task object from the backend so that `due_date`
 * is accessible via `dueDate` expected by the React components.
 */
export const normalizeTask = (task) => {
  if (!task) return task
  return {
    ...task,
    dueDate: task.due_date ?? task.dueDate ?? "",
  }
}

/**
 * Fetch all tasks from the backend.
 * @returns {Promise<Array>} List of normalized task objects.
 */
export const getTasks = async () => {
  const response = await fetch(`${API_BASE_URL}/tasks`)
  const result = await response.json()

  if (!response.ok || !result.success) {
    throw new Error(result.message || "Failed to fetch tasks")
  }

  return (result.data || []).map(normalizeTask)
}

/**
 * Fetch a single task by ID.
 * @param {string} id - Task UUID
 * @returns {Promise<Object>} Normalized task object.
 */
export const getTaskById = async (id) => {
  const response = await fetch(`${API_BASE_URL}/tasks/${id}`)
  const result = await response.json()

  if (!response.ok || !result.success) {
    throw new Error(result.message || "Failed to fetch task")
  }

  return normalizeTask(result.data)
}

/**
 * Create a new task.
 * @param {Object} taskData - Task payload containing title, description, priority, status, category, dueDate
 * @returns {Promise<Object>} Normalized created task object.
 */
export const createTask = async (taskData) => {
  const response = await fetch(`${API_BASE_URL}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(taskData),
  })
  const result = await response.json()

  if (!response.ok || !result.success) {
    throw new Error(result.message || "Failed to create task")
  }

  return normalizeTask(result.data)
}

/**
 * Update an existing task.
 * @param {string} id - Task UUID
 * @param {Object} taskData - Fields to update (including dueDate)
 * @returns {Promise<Object>} Normalized updated task object.
 */
export const updateTask = async (id, taskData) => {
  const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(taskData),
  })
  const result = await response.json()

  if (!response.ok || !result.success) {
    throw new Error(result.message || "Failed to update task")
  }

  return normalizeTask(result.data)
}

/**
 * Delete a task by ID.
 * @param {string} id - Task UUID
 * @returns {Promise<Object>} Result object with success flag and message.
 */
export const deleteTask = async (id) => {
  const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
    method: "DELETE",
  })
  const result = await response.json()

  if (!response.ok || !result.success) {
    throw new Error(result.message || "Failed to delete task")
  }

  return result
}
