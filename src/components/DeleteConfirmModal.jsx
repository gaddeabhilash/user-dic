import '../styles/DeleteConfirmModal.css'

export default function DeleteConfirmModal({ user, users, isOpen, onClose, onConfirm }) {
  if (!isOpen) return null

  const isMultiple = users && users.length > 1
  const displayUser = user || (users && users[0])

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content delete-confirm" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Delete {isMultiple ? 'Users' : 'User'}</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        
        <div className="confirm-message">
          {isMultiple ? (
            <>
              <p>Are you sure you want to delete <strong>{users.length} users</strong>?</p>
              <div className="users-list">
                {users.map(u => (
                  <div key={u.id} className="user-item">
                    • {u.name}
                  </div>
                ))}
              </div>
            </>
          ) : (
            <p>Are you sure you want to delete <strong>{displayUser.name}</strong>?</p>
          )}
          <p className="subtitle">This action cannot be undone.</p>
        </div>

        <div className="form-actions">
          <button className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button className="btn btn-danger" onClick={() => {
            if (isMultiple) {
              onConfirm(users.map(u => u.id))
            } else {
              onConfirm([displayUser.id])
            }
            onClose()
          }}>
            Delete {isMultiple ? `(${users.length})` : ''}
          </button>
        </div>
      </div>
    </div>
  )
}
