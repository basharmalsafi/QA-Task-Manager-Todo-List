import { NavLink } from 'react-router-dom'
import './Layout.css'

export default function Layout({ children }) {
    return (
        <div className="layout">
            <aside className="sidebar">
                <div className="sidebar-header">
                    <div className="logo">
                        <div className="logo-icon">📋</div>
                        <h1 className="logo-text">QA Task Manager</h1>
                    </div>
                </div>

                <nav className="nav">
                    <NavLink to="/todo" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                        <span className="nav-icon">📝</span>
                        <span className="nav-text">To-Do</span>
                    </NavLink>
                    <NavLink to="/done" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                        <span className="nav-icon">✅</span>
                        <span className="nav-text">Done</span>
                    </NavLink>
                </nav>

                <div className="sidebar-footer">
                    <div className="user-info">
                        <div className="user-avatar">👤</div>
                        <div className="user-details">
                            <div className="user-name">QA Engineer</div>
                            <div className="user-role">Task Manager</div>
                        </div>
                    </div>
                </div>
            </aside>

            <main className="main-content">
                {children}
            </main>
        </div>
    )
}
