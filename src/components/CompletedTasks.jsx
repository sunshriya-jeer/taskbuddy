import { useState } from "react"
import TaskCard from "./TaskCard"
import SearchBar from "./SearchBar"

function CompletedTasks({ tasks = [], isLoading = false, onEdit, onDelete, onNavigate }) {
  const [searchTerm, setSearchTerm] = useState("")
  const [priorityFilter, setPriorityFilter] = useState("All Priorities")

  // Filter only tasks where status === "Completed"
  const completedTasks = tasks.filter((task) => task.status === "Completed")

  // Filter by search query and priority
  const filteredCompletedTasks = completedTasks.filter((task) => {
    const query = searchTerm.trim().toLowerCase()
    const matchesSearch =
      query === "" ||
      (task.title && task.title.toLowerCase().includes(query)) ||
      (task.description && task.description.toLowerCase().includes(query)) ||
      (task.category && task.category.toLowerCase().includes(query))

    const matchesPriority =
      priorityFilter === "All Priorities" || task.priority === priorityFilter

    return matchesSearch && matchesPriority
  })

  const isFiltered = searchTerm.trim() !== "" || priorityFilter !== "All Priorities"

  const handleResetFilters = () => {
    setSearchTerm("")
    setPriorityFilter("All Priorities")
  }

  return (
    <section className="completed-tasks-view">
      <div className="section-header">
        <div className="section-title-wrap">
          <h2 className="section-title">Completed Tasks</h2>
          <span className="tasks-counter-badge">
            {isLoading
              ? "Loading..."
              : isFiltered
              ? `${filteredCompletedTasks.length} of ${completedTasks.length}`
              : `${completedTasks.length} completed`}
          </span>
        </div>
      </div>

      {!isLoading && completedTasks.length > 0 && (
        <div className="tasks-toolbar">
          <SearchBar
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onClear={() => setSearchTerm("")}
            placeholder="Search completed tasks..."
          />
          <div className="filter-bar">
            <div className="filter-controls-group">
              <div className="filter-select-wrapper">
                <label
                  htmlFor="completed-priority-select"
                  className="filter-label visually-hidden"
                >
                  Filter by priority
                </label>
                <div className="filter-select-inner">
                  <svg
                    className="filter-icon"
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path>
                    <line x1="4" y1="22" x2="4" y2="15"></line>
                  </svg>
                  <select
                    id="completed-priority-select"
                    className="filter-select"
                    value={priorityFilter}
                    onChange={(e) => setPriorityFilter(e.target.value)}
                    aria-label="Filter by priority"
                  >
                    <option value="All Priorities">All Priorities</option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
              </div>

              {isFiltered && (
                <button
                  type="button"
                  className="filter-reset-btn"
                  onClick={handleResetFilters}
                  title="Reset search and filters"
                  aria-label="Reset all search and filter settings"
                >
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
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                  <span>Reset</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {isLoading ? (
        <div className="empty-state">
          <div className="empty-state-illustration">
            <div className="empty-icon-circle empty-loading-circle">
              <svg
                className="loading-spinner-icon"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="12" y1="2" x2="12" y2="6"></line>
                <line x1="12" y1="18" x2="12" y2="22"></line>
                <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
                <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
                <line x1="2" y1="12" x2="6" y2="12"></line>
                <line x1="18" y1="12" x2="22" y2="12"></line>
                <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
                <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
              </svg>
            </div>
          </div>
          <h3 className="empty-state-heading">Loading completed tasks...</h3>
          <p className="empty-state-text">
            Connecting to backend and fetching your tasks.
          </p>
        </div>
      ) : completedTasks.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-illustration">
            <div
              className="empty-icon-circle"
              style={{
                background: "linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)",
                color: "#10b981",
              }}
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </div>
          </div>
          <h3 className="empty-state-heading">No completed tasks yet</h3>
          <p className="empty-state-text">
            Complete a task and it will appear here.
          </p>
          {onNavigate && (
            <button
              type="button"
              className="empty-state-btn"
              onClick={() => onNavigate("dashboard")}
            >
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
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
              </svg>
              <span>Back to Dashboard</span>
            </button>
          )}
        </div>
      ) : filteredCompletedTasks.length === 0 ? (
        <div className="empty-state empty-state-no-results">
          <div className="empty-state-illustration">
            <div className="empty-icon-circle empty-search-circle">
              <svg
                width="30"
                height="30"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                <line x1="8" y1="11" x2="14" y2="11"></line>
              </svg>
            </div>
          </div>
          <h3 className="empty-state-heading">No matching completed tasks</h3>
          <p className="empty-state-text">
            We couldn&apos;t find any completed tasks matching your search or filters.
          </p>
          <button
            type="button"
            className="empty-state-btn empty-state-reset-btn"
            onClick={handleResetFilters}
          >
            <span>Clear Filters</span>
          </button>
        </div>
      ) : (
        <div className="tasks-list">
          {filteredCompletedTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </section>
  )
}

export default CompletedTasks
