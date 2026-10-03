const defaultTask = {
  title: "Complete DSA Assignment",
  priority: "High",
  description: "Complete linked-list questions for the upcoming class.",
  dueDate: "Oct 5, 2026",
  status: "Pending",
}

function TaskCard({ task = defaultTask, onEdit, onDelete }) {
  const currentTask = { ...defaultTask, ...task }
  const taskId = task.id || currentTask.id

  const priorityKey = (currentTask.priority || "medium").toLowerCase()
  const statusKey = (currentTask.status || "pending")
    .toLowerCase()
    .replace(/\s+/g, "-")

  return (
    <article className="task-card">
      <div className="task-card-header">
        <div className="task-badges-row">
          {currentTask.category && (
            <span className="task-category-pill">
              {currentTask.category}
            </span>
          )}
          <span className={`priority-badge priority-${priorityKey}`}>
            <span className="badge-dot"></span>
            {currentTask.priority}
          </span>
        </div>

        <div className="task-actions">
          <button
            type="button"
            className="task-btn-action btn-edit"
            onClick={() => onEdit && onEdit(task.id ? task : currentTask)}
            title="Edit Task"
            aria-label="Edit Task"
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
            </svg>
            <span>Edit</span>
          </button>

          <button
            type="button"
            className="task-btn-action btn-delete"
            onClick={() => onDelete && onDelete(taskId)}
            title="Delete Task"
            aria-label="Delete Task"
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              <line x1="10" y1="11" x2="10" y2="17"></line>
              <line x1="14" y1="11" x2="14" y2="17"></line>
            </svg>
            <span>Delete</span>
          </button>
        </div>
      </div>

      <h3 className="task-title">{currentTask.title}</h3>

      {currentTask.description && (
        <p className="task-description">{currentTask.description}</p>
      )}

      <div className="task-card-footer">
        <div className="task-meta-info">
          <div className="task-due-date">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            <span>{currentTask.dueDate || "No due date"}</span>
          </div>

          <span className={`status-badge status-${statusKey}`}>
            <span className="status-indicator-dot"></span>
            {currentTask.status}
          </span>
        </div>
      </div>
    </article>
  )
}

export default TaskCard