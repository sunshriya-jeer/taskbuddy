import { useState, useEffect } from "react"

function TaskForm({
  onCancel,
  onCreateTask,
  onUpdateTask,
  onSubmit,
  taskToEdit,
  initialValues,
}) {
  const isEditing = Boolean(taskToEdit)
  const initialSource = taskToEdit || initialValues

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    title: initialSource?.title || "",
    description: initialSource?.description || "",
    priority: initialSource?.priority || "Medium",
    status: initialSource?.status || "Pending",
    category: initialSource?.category || "",
    dueDate: initialSource?.dueDate || "",
  })

  // Close modal when pressing Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && onCancel && !isSubmitting) {
        onCancel()
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [onCancel, isSubmitting])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.title.trim() || isSubmitting) return

    try {
      setIsSubmitting(true)
      if (isEditing) {
        if (onUpdateTask) {
          await onUpdateTask({
            ...formData,
            id: taskToEdit.id,
          })
        }
      } else {
        if (onCreateTask) {
          await onCreateTask(formData)
        } else if (onSubmit) {
          await onSubmit(formData)
        }
      }

      setFormData({
        title: "",
        description: "",
        priority: "Medium",
        status: "Pending",
        category: "",
        dueDate: "",
      })

      if (onCancel) {
        onCancel()
      }
    } catch {
      // If error occurs, keep form open and reset submission state
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCancel = () => {
    if (isSubmitting) return
    setFormData({
      title: "",
      description: "",
      priority: "Medium",
      status: "Pending",
      category: "",
      dueDate: "",
    })

    if (onCancel) {
      onCancel()
    }
  }

  return (
    <div className="modal-backdrop" onClick={handleCancel}>
      <div
        className="modal-container"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <form className="task-form-modal" onSubmit={handleSubmit}>
          <div className="modal-header">
            <div>
              <h2 id="modal-title" className="modal-title">
                {isEditing ? "Edit Task" : "Create New Task"}
              </h2>
              <p className="modal-subtitle">
                {isEditing
                  ? "Update the fields below to modify this task."
                  : "Fill in the details below to add a new task to your workspace."}
              </p>
            </div>

            <button
              type="button"
              className="modal-close-btn"
              onClick={handleCancel}
              aria-label="Close dialog"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          <div className="modal-body">
            <div className="form-group">
              <label htmlFor="task-title" className="form-label">
                Task Title <span className="required-star">*</span>
              </label>
              <input
                id="task-title"
                name="title"
                type="text"
                className="form-input"
                placeholder="e.g. Prepare Quarter 4 Product Roadmap"
                value={formData.title}
                onChange={handleChange}
                required
                autoFocus
              />
            </div>

            <div className="form-group">
              <label htmlFor="task-description" className="form-label">
                Description
              </label>
              <textarea
                id="task-description"
                name="description"
                rows="3"
                className="form-textarea"
                placeholder="Add subtasks, links, or notes..."
                value={formData.description}
                onChange={handleChange}
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="task-priority" className="form-label">
                  Priority
                </label>
                <div className="select-wrapper">
                  <select
                    id="task-priority"
                    name="priority"
                    className="form-select"
                    value={formData.priority}
                    onChange={handleChange}
                  >
                    <option value="Low">Low Priority</option>
                    <option value="Medium">Medium Priority</option>
                    <option value="High">High Priority</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="task-status" className="form-label">
                  Status
                </label>
                <div className="select-wrapper">
                  <select
                    id="task-status"
                    name="status"
                    className="form-select"
                    value={formData.status}
                    onChange={handleChange}
                  >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="task-category" className="form-label">
                  Category
                </label>
                <input
                  id="task-category"
                  name="category"
                  type="text"
                  className="form-input"
                  placeholder="e.g. Engineering, Marketing, Personal"
                  value={formData.category}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="task-due-date" className="form-label">
                  Due Date
                </label>
                <input
                  id="task-due-date"
                  name="dueDate"
                  type="date"
                  className="form-input"
                  value={formData.dueDate}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn-modal-cancel"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-modal-submit"
              disabled={isSubmitting}
            >
              {isEditing ? (
                <>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span>{isSubmitting ? "Updating..." : "Update Task"}</span>
                </>
              ) : (
                <>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                  <span>{isSubmitting ? "Creating..." : "Create Task"}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default TaskForm
