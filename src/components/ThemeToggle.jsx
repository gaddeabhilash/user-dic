import '../styles/ThemeToggle.css'

export default function ThemeToggle({ isDarkMode, onToggle }) {
  return (
    <button className="theme-toggle" onClick={onToggle} aria-label="Toggle theme">
      {isDarkMode ? '☀️' : '🌙'}
    </button>
  )
}
