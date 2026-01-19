# QA Study Task Manager

A modern, responsive web application for managing QA study tasks with a beautiful dark theme interface.

![QA Task Manager](https://img.shields.io/badge/Status-Ready-success)
![React](https://img.shields.io/badge/React-18.2-blue)
![Node](https://img.shields.io/badge/Node-18+-green)

## ✨ Features

### Core Functionality
- ✅ **Task Management**: Create, edit, delete, and complete tasks
- 📊 **Two-Page Navigation**: Separate views for To-Do and Done tasks
- 🔍 **Search & Filter**: Search by title/description, filter by priority and tags
- 📈 **Sorting**: Sort by title, priority, start date, or due date
- 🏷️ **Tag System**: Organize tasks with custom tags
- ⚡ **Priority Levels**: High, Medium, and Low priority tasks

### Timeline & Deadline Features
- 🔴 **Overdue Detection**: Red indicator for past-due tasks
- 🟡 **Due Soon Alert**: Yellow indicator for tasks due within 48 hours
- 🟢 **On Track**: Green indicator for tasks with time remaining
- ✅ **Completed**: Visual confirmation for finished tasks

### UI/UX
- 🌙 **Dark Theme**: Modern, premium dark mode design
- 🎨 **Gradient Accents**: Beautiful green-to-purple gradients
- 📱 **Responsive**: Works on desktop, tablet, and mobile
- ⚡ **Smooth Animations**: Micro-interactions and transitions
- 🎯 **Clean Layout**: Sidebar navigation with intuitive structure

## 🏗️ Architecture

### Frontend (React + Vite)
- **Framework**: React 18.2 with Vite for fast development
- **Routing**: React Router for page navigation
- **Styling**: Vanilla CSS with CSS Variables for theming
- **Components**: Modular, reusable components

### Backend (Node.js + Express)
- **Server**: Express.js REST API
- **Database**: SQLite with better-sqlite3
- **Logic Layer**: Deadline calculations and status management
- **CORS**: Enabled for local development

### Database Schema
```sql
tasks (
  id INTEGER PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  startDate TEXT,
  dueDate TEXT,
  priority TEXT DEFAULT 'Medium',
  tags TEXT DEFAULT '[]',
  status TEXT DEFAULT 'pending',
  createdAt TEXT,
  updatedAt TEXT
)
```

## 📋 Prerequisites

Before running this application, you need to install:

1. **Node.js** (v18 or higher)
   - Download from: https://nodejs.org/
   - Verify installation: `node --version`

2. **npm** (comes with Node.js)
   - Verify installation: `npm --version`

## 🚀 Installation & Setup

### Step 1: Install Dependencies

#### Backend
```bash
cd server
npm install
```

#### Frontend
```bash
cd client
npm install
```

### Step 2: Start the Backend Server
```bash
cd server
npm run dev
```

The server will start on `http://localhost:3001`

### Step 3: Start the Frontend (in a new terminal)
```bash
cd client
npm run dev
```

The app will open on `http://localhost:3000`

## 📖 Usage Guide

### Creating a Task
1. Click the **"➕ Add Task"** button
2. Fill in the task details:
   - **Title** (required)
   - **Description** (optional)
   - **Start Date** and **Due Date**
   - **Priority** (Low, Medium, High)
   - **Status** (Pending, In Progress, Completed)
   - **Tags** (add custom tags)
3. Click **"Create Task"**

### Managing Tasks
- **Edit**: Click the ✏️ icon to modify a task
- **Complete**: Click the ✓ icon to mark as done
- **Delete**: Click the 🗑️ icon to remove a task
- **Restore**: In the Done page, click ↩️ to restore a task

### Filtering & Searching
- Use the **search bar** to find tasks by title or description
- Filter by **priority** (High, Medium, Low)
- Filter by **tags** if you've created any
- Click **column headers** to sort (↑ ascending, ↓ descending)

### Understanding Status Colors
- 🔴 **Red (Overdue)**: Task is past its due date
- 🟡 **Yellow (Due Soon)**: Task is due within 48 hours
- 🟢 **Green (On Track)**: Task has time remaining
- ✅ **Green (Completed)**: Task is finished

## 📁 Project Structure

```
Todo-APP/
├── client/                 # React Frontend
│   ├── src/
│   │   ├── api/           # API service layer
│   │   ├── components/    # Reusable components
│   │   │   ├── Layout.jsx
│   │   │   ├── TaskTable.jsx
│   │   │   └── TaskModal.jsx
│   │   ├── pages/         # Page components
│   │   │   ├── TodoPage.jsx
│   │   │   └── DonePage.jsx
│   │   ├── App.jsx        # Main app component
│   │   ├── main.jsx       # Entry point
│   │   └── index.css      # Global styles
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
└── server/                # Node.js Backend
    ├── logic/             # Business logic
    │   └── deadlines.js
    ├── routes/            # API routes
    │   └── tasks.js
    ├── db.js              # Database setup
    ├── index.js           # Server entry point
    └── package.json
```

## 🎨 Design System

### Color Palette
- **Background**: Dark blues and grays (#0f0f1e, #1a1a2e)
- **Accents**: Green (#4ade80) and Purple (#a78bfa)
- **Status Colors**: Red (#ef4444), Yellow (#f59e0b), Green (#10b981)

### Typography
- **Font**: Inter (Google Fonts)
- **Sizes**: Responsive scale from 0.75rem to 1.875rem

## 🔧 API Endpoints

### Tasks
- `GET /api/tasks` - Get all tasks (optional: `?status=pending|completed`)
- `GET /api/tasks/:id` - Get single task
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

## 🧪 Testing (Future Enhancement)

The application is designed to support:
- **Unit Tests**: Jest for backend logic
- **Integration Tests**: API endpoint testing
- **E2E Tests**: Playwright or Cypress for UI testing

## 🚀 Future Enhancements

- [ ] Dashboard with charts and analytics
- [ ] Weekly progress statistics
- [ ] Export to CSV/PDF
- [ ] Backup and restore functionality
- [ ] Study templates (Selenium, API, SQL, TestNG)
- [ ] Push notifications for due tasks
- [ ] Calendar view
- [ ] Gantt-style timeline

## 🐛 Troubleshooting

### Server won't start
- Make sure Node.js is installed: `node --version`
- Check if port 3001 is available
- Run `npm install` in the server directory

### Frontend won't start
- Make sure port 3000 is available
- Run `npm install` in the client directory
- Check that the backend is running first

### Tasks not loading
- Verify the backend server is running on port 3001
- Check browser console for errors
- Ensure CORS is enabled in the backend

## 📝 License

This project is open source and available for educational purposes.

## 👨‍💻 Author

Built with ❤️ for QA Engineers studying for their next certification!
