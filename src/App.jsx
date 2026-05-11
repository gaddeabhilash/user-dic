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

  const handleConfirmDelete = (userId) => {
    setUsers(users.filter(u => u.id !== userId))
    setIsDeleteModalOpen(false)
    setUserToDelete(null)
  }

  return (
    <div className="app">
      <header className="header">
        <h1>User Directory</h1>
        <div className="header-actions">
          <button className="btn-add-user" onClick={handleAddNewUser}>
            ➕ Add User
          </button>
          <ThemeToggle isDarkMode={isDarkMode} onToggle={toggleTheme} />
        </div>
      </header>

      <main className="container">
        <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />

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
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false)
          setUserToDelete(null)
        }}
        onConfirm={handleConfirmDelete}
      />
    </div>
  )
}
