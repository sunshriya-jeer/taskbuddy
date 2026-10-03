function SearchBar({
  value = "",
  onChange,
  searchTerm,
  onSearchChange,
  placeholder = "Search tasks by title or description...",
  onClear,
}) {
  // Support either value/onChange or searchTerm/onSearchChange for maximum flexibility
  const searchValue = value !== undefined && value !== "" ? value : (searchTerm ?? value ?? "")
  const handleChange = onChange || onSearchChange

  return (
    <div className="search-bar">
      <div className="search-input-wrapper">
        <svg
          className="search-icon"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>

        <input
          type="text"
          className="search-input"
          placeholder={placeholder}
          value={searchValue}
          onChange={handleChange}
          aria-label="Search tasks"
        />

        {searchValue && (
          <button
            type="button"
            className="search-clear-btn"
            onClick={onClear || (() => handleChange && handleChange({ target: { value: "" } }))}
            title="Clear search"
            aria-label="Clear search query"
          >
            <svg
              width="14"
              height="14"
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
          </button>
        )}
      </div>
    </div>
  )
}

export default SearchBar
