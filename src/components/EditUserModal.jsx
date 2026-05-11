import { useState, useEffect } from 'react'
import '../styles/EditUserModal.css'

export default function EditUserModal({ user, isOpen, onClose, onSave, isNewUser = false }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    username: '',
    phone: '',
    website: '',
    company: { name: '' }
  })

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        username: user.username || '',
        phone: user.phone || '',
        website: user.website || '',
        company: { name: user.company?.name || '' }
      })
    }
  }, [user, isOpen])

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name === 'company') {
      setFormData(prev => ({
        ...prev,
        company: { ...prev.company, name: value }
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (formData.name.trim() && formData.email.trim()) {
      onSave(formData)
      setFormData({
        name: '',
        email: '',
        username: '',
        phone: '',
        website: '',
        company: { name: '' }
      })
    }
  }

  if (!isOpen) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{isNewUser ? 'Add New User' : 'Edit User'}</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        
        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label htmlFor="name">Name *</label>
            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter full name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter username"
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input
              id="phone"
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter phone number"
            />
          </div>

          <div className="form-group">
            <label htmlFor="website">Website</label>
            <input
              id="website"
              type="text"
              name="website"
              value={formData.website}
              onChange={handleChange}
              placeholder="Enter website URL"
            />
          </div>

          <div className="form-group">
            <label htmlFor="company">Company</label>
            <input
              id="company"
              type="text"
              name="company"
              value={formData.company.name}
              onChange={handleChange}
              placeholder="Enter company name"
            />
          </div>

          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {isNewUser ? 'Add User' : 'Update User'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
