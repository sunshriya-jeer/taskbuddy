import supabase from "./supabaseClient"

const API_BASE_URL = "https://taskbuddy-4rno.onrender.com/api"

/**
 * Retrieves the current Supabase session access token and returns
 * the authorization headers object.
 */
const getAuthHeaders = async () => {
  try {
    const { data: { session }, error } = await supabase.auth.getSession()
    if (error) {
      console.error("Error retrieving Supabase session for API headers:", error.message)
    }
    const token = session?.access_token
    return token ? { Authorization: `Bearer ${token}` } : {}
  } catch (err) {
    console.error("Failed to get auth session:", err)
    return {}
  }
}

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
 * Fetch all tasks from the backend for the authenticated user.
 * @returns {Promise<Array>} List of normalized task objects.
 */
export const getTasks = async () => {
  const authHeaders = await getAuthHeaders()
  const response = await fetch(`${API_BASE_URL}/tasks`, {
    headers: {
      ...authHeaders,
    },
  })
  const result = await response.json()

  if (!response.ok || !result.success) {
    throw new Error(result.message || "Failed to fetch tasks")
  }

  return (result.data || []).map(normalizeTask)
}

/**
 * Fetch a single task by ID for the authenticated user.
 * @param {string} id - Task UUID
 * @returns {Promise<Object>} Normalized task object.
 */
export const getTaskById = async (id) => {
  const authHeaders = await getAuthHeaders()
  const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
    headers: {
      ...authHeaders,
    },
  })
  const result = await response.json()

  if (!response.ok || !result.success) {
    throw new Error(result.message || "Failed to fetch task")
  }

  return normalizeTask(result.data)
}

/**
 * Create a new task for the authenticated user.
 * @param {Object} taskData - Task payload containing title, description, priority, status, category, dueDate
 * @returns {Promise<Object>} Normalized created task object.
 */
export const createTask = async (taskData) => {
  const authHeaders = await getAuthHeaders()
  const response = await fetch(`${API_BASE_URL}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...authHeaders,
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
 * Update an existing task for the authenticated user.
 * @param {string} id - Task UUID
 * @param {Object} taskData - Fields to update (including dueDate)
 * @returns {Promise<Object>} Normalized updated task object.
 */
export const updateTask = async (id, taskData) => {
  const authHeaders = await getAuthHeaders()
  const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...authHeaders,
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
 * Delete a task by ID for the authenticated user.
 * @param {string} id - Task UUID
 * @returns {Promise<Object>} Result object with success flag and message.
 */
export const deleteTask = async (id) => {
  const authHeaders = await getAuthHeaders()
  const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
    method: "DELETE",
    headers: {
      ...authHeaders,
    },
  })
  const result = await response.json()

  if (!response.ok || !result.success) {
    throw new Error(result.message || "Failed to delete task")
  }

  return result
}
