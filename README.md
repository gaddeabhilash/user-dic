# User Directory App

A modern React + Vite application for browsing and searching a directory of users fetched from the JSONPlaceholder API.

## Features

✨ **Fetch Users from API** - Retrieves user data from JSONPlaceholder API
📇 **Display Cards** - Shows user information in beautiful card components
🔍 **Search Users** - Real-time search by name, email, or username
🌙 **Dark/Light Theme** - Theme toggle with localStorage persistence
📱 **Responsive Design** - Works perfectly on desktop, tablet, and mobile devices

## Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **CSS3** - Styling with CSS custom properties for theming
- **JSONPlaceholder API** - Mock API for user data

## Project Structure

```
src/
├── components/
│   ├── UserCard.jsx       # User card display component
│   ├── SearchBar.jsx      # Search input component
│   └── ThemeToggle.jsx    # Theme switcher component
├── styles/
│   ├── UserCard.css       # User card styling
│   ├── SearchBar.css      # Search bar styling
│   └── ThemeToggle.css    # Theme toggle styling
├── App.jsx                # Main app component
├── App.css                # App styling
├── index.css              # Global styles
├── main.jsx               # React entry point
└── index.html             # HTML entry point
```

## Installation

1. Navigate to the project directory:
```bash
cd "user dic"
```

2. Install dependencies:
```bash
npm install
```

## Development

Run the development server:
```bash
npm run dev
```

The app will open automatically at `http://localhost:3000`

## Build

Create an optimized production build:
```bash
npm run build
```

## Preview

Preview the production build:
```bash
npm run preview
```

## Features in Detail

### Fetch Users from API
- Automatically fetches 10 users from JSONPlaceholder on app load
- Shows loading state while fetching
- Handles errors gracefully

### Display Cards
- Each user is displayed in a card with:
  - Avatar (first letter of name)
  - Full name and username
  - Email (clickable link)
  - Phone number
  - Company name
  - Website (clickable link)
- Cards have hover effects and smooth transitions

### Search Users
- Search across name, email, and username
- Real-time filtering as you type
- Shows "No users found" when no matches
- Case-insensitive search

### Theme Storage
- Toggle between light and dark modes
- Theme preference is automatically saved to localStorage
- Theme persists across browser sessions
- Smooth transitions between themes

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT
