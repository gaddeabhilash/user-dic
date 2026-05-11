import '../styles/SearchBar.css'

export default function SearchBar({ searchTerm, onSearchChange }) {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search by name, email, or username..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="search-input"
      />
      <span className="search-icon">🔍</span>
    </div>
  )
}
