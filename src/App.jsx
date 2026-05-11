import { useState, useEffect } from 'react'
import './App.css'
import UserCard from './components/UserCard'
import SearchBar from './components/SearchBar'
import ThemeToggle from './components/ThemeToggle'
import EditUserModal from './components/EditUserModal'
import DeleteConfirmModal from './components/DeleteConfirmModal'

export default function App() {
  const [users, setUsers] = useState([])
  const [filteredUsers, setFilteredUsers] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [editingUser, setEditingUser] = useState(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [userToDelete, setUserToDelete] = useState(null)
  const [usersToDelete, setUsersToDelete] = useState([])
  const [selectedUsers, setSelectedUsers] = useState(new Set())
  const [nextId, setNextId] = useState(11)

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark')
    }
  }, [])

  // Apply theme to document
  useEffect(() => {
    const theme = isDarkMode ? 'dark' : 'light'
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [isDarkMode])

  // Fetch users from API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true)
        const response = await fetch('https://jsonplaceholder.typicode.com/users')
        if (!response.ok) throw new Error('Failed to fetch users')
        const data = await response.json()
        setUsers(data)
        setFilteredUsers(data)
        setNextId(Math.max(...data.map(u => u.id)) + 1)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  // Handle search
  useEffect(() => {
    const filtered = users.filter(user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.username.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredUsers(filtered)
  }, [searchTerm, users])

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
  }

  const handleAddNewUser = () => {
    setEditingUser(null)
    setIsEditModalOpen(true)
  }

  const handleEditUser = (user) => {
    setEditingUser(user)
    setIsEditModalOpen(true)
  }

  const handleDeleteUser = (user) => {
    setUserToDelete(user)
    setUsersToDelete([])
    setIsDeleteModalOpen(true)
  }

  const handleSelectUser = (userId, isChecked) => {
    const newSelected = new Set(selectedUsers)
    if (isChecked) {
      newSelected.add(userId)
    } else {
      newSelected.delete(userId)
    }
    setSelectedUsers(newSelected)
  }

  const handleSelectAll = () => {
    if (selectedUsers.size === filteredUsers.length && selectedUsers.size > 0) {
      setSelectedUsers(new Set())
    } else {
      setSelectedUsers(new Set(filteredUsers.map(u => u.id)))
    }
  }

  const handleDeleteSelected = () => {
    const usersArray = filteredUsers.filter(u => selectedUsers.has(u.id))
    setUsersToDelete(usersArray)
    setUserToDelete(null)
    setIsDeleteModalOpen(true)
  }

  const handleSaveUser = (formData) => {
    if (editingUser && editingUser.id) {
      // Update existing user
      setUsers(users.map(u => 
        u.id === editingUser.id 
          ? { ...u, ...formData }
          : u
      ))
    } else {
      // Add new user
      const newUser = {
        ...formData,
        id: nextId,
        address: { geo: {} },
        phone: formData.phone || '',
        website: formData.website || ''
      }
      setUsers([newUser, ...users])
      setNextId(nextId + 1)
    }
    setIsEditModalOpen(false)
    setEditingUser(null)
  }

  const handleConfirmDelete = (userIds) => {
    const idsArray = Array.isArray(userIds) ? userIds : [userIds]
    setUsers(users.filter(u => !idsArray.includes(u.id)))
    setSelectedUsers(new Set())
    setIsDeleteModalOpen(false)
    setUserToDelete(null)
    setUsersToDelete([])
  }

  const selectedCount = selectedUsers.size
  const isAllSelected = selectedCount === filteredUsers.length && filteredUsers.length > 0

  return (
    <div className="app">
      <header className="header">
        <h1>User Directory</h1>
        <div className="header-actions">
          {selectedCount > 0 && (
            <div className="bulk-actions">
              <span className="selection-count">{selectedCount} selected</span>
              <button className="btn-delete-selected" onClick={handleDeleteSelected}>
                🗑️ Delete ({selectedCount})
              </button>
            </div>
          )}
          <button className="btn-add-user" onClick={handleAddNewUser}>
            ➕ Add User
          </button>
          <ThemeToggle isDarkMode={isDarkMode} onToggle={toggleTheme} />
        </div>
      </header>

      <main className="container">
        <div className="search-and-select">
          <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
          {filteredUsers.length > 0 && (
            <button 
              className="btn-select-all"
              onClick={handleSelectAll}
              title={isAllSelected ? 'Deselect all' : 'Select all'}
            >
              {isAllSelected ? '☑️ Deselect All' : '☐ Select All'}
            </button>
          )}
        </div>

        {loading && <p className="message">Loading users...</p>}
        {error && <p className="message error">Error: {error}</p>}

        {!loading && !error && filteredUsers.length === 0 && (
          <p className="message">No users found</p>
        )}

        <div className="users-grid">
          {filteredUsers.map(user => (
            <UserCard 
              key={user.id} 
              user={user}
              isSelected={selectedUsers.has(user.id)}
              onSelectChange={handleSelectUser}
              onEdit={handleEditUser}
              onDelete={handleDeleteUser}
            />
          ))}
        </div>
      </main>

      <EditUserModal
        user={editingUser}
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false)
          setEditingUser(null)
        }}
        onSave={handleSaveUser}
        isNewUser={!editingUser || !editingUser.id}
      />

      <DeleteConfirmModal
        user={userToDelete}
        users={usersToDelete.length > 0 ? usersToDelete : undefined}
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false)
          setUserToDelete(null)
          setUsersToDelete([])
        }}
        onConfirm={handleConfirmDelete}
      />
    </div>
  )
}
