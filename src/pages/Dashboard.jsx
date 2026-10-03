import { useState } from "react"
import Sidebar from "../components/Sidebar"
import TaskCard from "../components/TaskCard"
import TaskForm from "../components/TaskForm"
import SearchBar from "../components/SearchBar"
import FilterBar from "../components/FilterBar"

function Dashboard() {
  const [tasks, setTasks] = useState([])
  const [showTaskForm, setShowTaskForm] = useState(false)
  const [taskToEdit, setTaskToEdit] = useState(null)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  // Search and Filter States
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("All Statuses")
  const [priorityFilter, setPriorityFilter] = useState("All Priorities")

  const handleCreateTask = (newTaskData) => {
    const newTask = {
      ...newTaskData,
      id: Date.now(),
    }
    setTasks((prevTasks) => [newTask, ...prevTasks])
    setShowTaskForm(false)
    setTaskToEdit(null)
  }

  const handleEditTask = (updatedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    )
    setTaskToEdit(null)
    setShowTaskForm(false)
  }

  const handleDeleteTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId))
    if (taskToEdit && taskToEdit.id === taskId) {
      setTaskToEdit(null)
      setShowTaskForm(false)
    }
  }

  const handleStartEdit = (task) => {
    setTaskToEdit(task)
    setShowTaskForm(true)
  }

  const handleOpenCreateForm = () => {
    setTaskToEdit(null)
    setShowTaskForm(true)
  }

  const handleToggleForm = () => {
    if (showTaskForm) {
      setShowTaskForm(false)
      setTaskToEdit(null)
    } else {
      setTaskToEdit(null)
      setShowTaskForm(true)
    }
  }

  // Calculate live stats from task state
  const totalCount = tasks.length
  const inProgressCount = tasks.filter((t) => t.status === "In Progress").length
  const completedCount = tasks.filter((t) => t.status === "Completed").length
  const overdueCount = tasks.filter((t) => {
    if (!t.dueDate || t.status === "Completed") return false
    const due = new Date(t.dueDate)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return due < today
  }).length

  // Filtered tasks calculation based on search query, status, and priority
  const filteredTasks = tasks.filter((task) => {
    // 1. Search query: case-insensitive match on title and description
    const query = searchTerm.trim().toLowerCase()
    const matchesSearch =
      query === "" ||
      (task.title && task.title.toLowerCase().includes(query)) ||
      (task.description && task.description.toLowerCase().includes(query))

    // 2. Status filter
    const matchesStatus =
      statusFilter === "All Statuses" || task.status === statusFilter

    // 3. Priority filter
    const matchesPriority =
      priorityFilter === "All Priorities" || task.priority === priorityFilter

    return matchesSearch && matchesStatus && matchesPriority
  })

  // Check if any search or filter criteria is actively applied
  const isFiltered =
    searchTerm.trim() !== "" ||
    statusFilter !== "All Statuses" ||
    priorityFilter !== "All Priorities"

  // Reset all search and filter values to their defaults
  const handleResetFilters = () => {
    setSearchTerm("")
    setStatusFilter("All Statuses")
    setPriorityFilter("All Priorities")
  }

  return (
    <div className="app-layout">
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onOpenAddTask={handleOpenCreateForm}
      />

      <main className="main-content">
        {/* Mobile Header Bar */}
        <div className="mobile-top-bar">
          <button
            type="button"
            className="hamburger-btn"
            onClick={() => setIsSidebarOpen(true)}
            aria-label="Open sidebar menu"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>

          <div className="mobile-logo-text">
            <span className="logo-name">TaskBuddy</span>
          </div>

          <button
            type="button"
            className="mobile-add-btn"
            onClick={handleOpenCreateForm}
            aria-label="Add task"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </button>
        </div>

        {/* Dashboard Top Header */}
        <header className="dashboard-header">
          <div className="header-greeting">
            <div className="welcome-badge">
              <span className="pulse-dot"></span>
              <span>Overview</span>
            </div>
            <h1 className="header-title">Good morning 👋</h1>
            <p className="header-subtitle">
              Manage your tasks, track deadlines, and maintain your workflow.
            </p>
          </div>

          <div className="header-actions">
            <button
              type="button"
              className="primary-add-button"
              onClick={handleToggleForm}
            >
              <svg
                width="18"
                height="18"
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
              <span>{showTaskForm ? "Close Form" : "New Task"}</span>
            </button>
          </div>
        </header>

        {/* Statistics Cards Grid */}
        <section className="stats-grid">
          <div className="stat-card stat-card-total">
            <div className="stat-card-top">
              <span className="stat-label">Total Tasks</span>
              <div className="stat-icon-wrapper icon-total">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
              </div>
            </div>
            <div className="stat-value">{totalCount}</div>
            <div className="stat-subtext">All active & finished</div>
          </div>

          <div className="stat-card stat-card-progress">
            <div className="stat-card-top">
              <span className="stat-label">In Progress</span>
              <div className="stat-icon-wrapper icon-progress">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
              </div>
            </div>
            <div className="stat-value">{inProgressCount}</div>
            <div className="stat-subtext">Currently working on</div>
          </div>

          <div className="stat-card stat-card-completed">
            <div className="stat-card-top">
              <span className="stat-label">Completed</span>
              <div className="stat-icon-wrapper icon-completed">
                <svg
                  width="18"
                  height="18"
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
            <div className="stat-value">{completedCount}</div>
            <div className="stat-subtext">Accomplished items</div>
          </div>

          <div className="stat-card stat-card-overdue">
            <div className="stat-card-top">
              <span className="stat-label">Overdue</span>
              <div className="stat-icon-wrapper icon-overdue">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
              </div>
            </div>
            <div className="stat-value">{overdueCount}</div>
            <div className="stat-subtext">Requires immediate attention</div>
          </div>
        </section>

        {/* Modal Form for Create / Edit */}
        {showTaskForm && (
          <TaskForm
            key={taskToEdit ? taskToEdit.id : "new"}
            taskToEdit={taskToEdit}
            onCreateTask={handleCreateTask}
            onUpdateTask={handleEditTask}
            onCancel={() => {
              setShowTaskForm(false)
              setTaskToEdit(null)
            }}
          />
        )}

        {/* Tasks Section */}
        <section id="tasks" className="tasks-section">
          <div className="section-header">
            <div className="section-title-wrap">
              <h2 className="section-title">My Tasks</h2>
              <span className="tasks-counter-badge">
                {isFiltered ? `${filteredTasks.length} of ${tasks.length}` : totalCount}
              </span>
            </div>
            <div className="section-actions">
              <button
                type="button"
                className="section-btn-new"
                onClick={handleOpenCreateForm}
              >
                + Add Task
              </button>
            </div>
          </div>

          {/* SearchBar & FilterBar Toolbar */}
          <div className="tasks-toolbar">
            <SearchBar
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onClear={() => setSearchTerm("")}
            />
            <FilterBar
              statusFilter={statusFilter}
              onStatusChange={(e) => setStatusFilter(e.target.value)}
              priorityFilter={priorityFilter}
              onPriorityChange={(e) => setPriorityFilter(e.target.value)}
              onResetFilters={handleResetFilters}
              isFiltered={isFiltered}
            />
          </div>

          {tasks.length === 0 ? (
            /* Attractive empty state when user has no tasks yet */
            <div className="empty-state">
              <div className="empty-state-illustration">
                <div className="empty-icon-circle">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                    <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
                    <path d="M9 14l2 2 4-4"></path>
                  </svg>
                </div>
              </div>
              <h3 className="empty-state-heading">No tasks yet</h3>
              <p className="empty-state-text">
                Your workspace is all clear! Create your first task to stay organized, prioritize goals, and keep track of deadlines.
              </p>
              <button
                type="button"
                className="empty-state-btn"
                onClick={handleOpenCreateForm}
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
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
                <span>Create Your First Task</span>
              </button>
            </div>
          ) : filteredTasks.length === 0 ? (
            /* Separate empty state when tasks exist but search / filter returns no results */
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
              <h3 className="empty-state-heading">No matching tasks</h3>
              <p className="empty-state-text">
                We couldn&apos;t find any tasks matching your search or filters. Try adjusting your search query or reset your filters.
              </p>
              <button
                type="button"
                className="empty-state-btn empty-state-reset-btn"
                onClick={handleResetFilters}
              >
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
                <span>Clear Filters</span>
              </button>
            </div>
          ) : (
            <div className="tasks-list">
              {filteredTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onEdit={handleStartEdit}
                  onDelete={handleDeleteTask}
                />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  )
}

export default Dashboard