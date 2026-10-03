function FilterBar({
  statusFilter = "All Statuses",
  onStatusChange,
  priorityFilter = "All Priorities",
  onPriorityChange,
  onResetFilters,
  isFiltered = false,
}) {
  return (
    <div className="filter-bar">
      <div className="filter-controls-group">
        {/* Status Filter */}
        <div className="filter-select-wrapper">
          <label htmlFor="status-filter-select" className="filter-label visually-hidden">
            Filter by status
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
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
            </svg>
            <select
              id="status-filter-select"
              className="filter-select"
              value={statusFilter}
              onChange={onStatusChange}
              aria-label="Filter by status"
            >
              <option value="All Statuses">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        </div>

        {/* Priority Filter */}
        <div className="filter-select-wrapper">
          <label htmlFor="priority-filter-select" className="filter-label visually-hidden">
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
              id="priority-filter-select"
              className="filter-select"
              value={priorityFilter}
              onChange={onPriorityChange}
              aria-label="Filter by priority"
            >
              <option value="All Priorities">All Priorities</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
        </div>

        {/* Clear / Reset Filters Button (displayed when any filter is active) */}
        {isFiltered && onResetFilters && (
          <button
            type="button"
            className="filter-reset-btn"
            onClick={onResetFilters}
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
            <span>Reset Filters</span>
          </button>
        )}
      </div>
    </div>
  )
}

export default FilterBar
