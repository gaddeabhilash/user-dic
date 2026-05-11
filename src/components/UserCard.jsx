import '../styles/UserCard.css'

export default function UserCard({ user, onEdit, onDelete }) {
  return (
    <div className="user-card">
      <div className="user-avatar">
        {user.name.charAt(0).toUpperCase()}
      </div>
      <div className="user-content">
        <h3 className="user-name">{user.name}</h3>
        <p className="user-username">@{user.username}</p>
        <p className="user-email">
          <span className="label">Email:</span>
          <a href={`mailto:${user.email}`}>{user.email}</a>
        </p>
        <p className="user-phone">
          <span className="label">Phone:</span>
          {user.phone}
        </p>
        <p className="user-company">
          <span className="label">Company:</span>
          {user.company.name}
        </p>
        <p className="user-website">
          <span className="label">Website:</span>
          <a href={`https://${user.website}`} target="_blank" rel="noopener noreferrer">
            {user.website}
          </a>
        </p>
      </div>
      <div className="user-actions">
        <button className="btn-icon edit" onClick={() => onEdit(user)} title="Edit user">
          ✏️
        </button>
        <button className="btn-icon delete" onClick={() => onDelete(user)} title="Delete user">
          🗑️
        </button>
      </div>
    </div>
  )
}
