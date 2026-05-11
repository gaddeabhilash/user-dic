import '../styles/DeleteConfirmModal.css'

export default function DeleteConfirmModal({ user, isOpen, onClose, onConfirm }) {
  if (!isOpen || !user) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content delete-confirm" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Delete User</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        
        <div className="confirm-message">
          <p>Are you sure you want to delete <strong>{user.name}</strong>?</p>
          <p className="subtitle">This action cannot be undone.</p>
        </div>

        <div className="form-actions">
          <button className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button className="btn btn-danger" onClick={() => {
            onConfirm(user.id)
            onClose()
          }}>
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}
