import { useState, useEffect } from 'react'
import TaskTable from '../components/TaskTable'
import { taskAPI } from '../api/tasks'
import './TodoPage.css'

export default function DonePage() {
    const [tasks, setTasks] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        loadTasks()
    }, [])

    const loadTasks = async () => {
        try {
            setLoading(true)
            const data = await taskAPI.getTasks()
            // Filter for completed tasks only
            setTasks(data.filter(t => t.status === 'completed'))
        } catch (error) {
            console.error('Failed to load tasks:', error)
            alert('Failed to load tasks. Make sure the server is running.')
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this task?')) return

        try {
            await taskAPI.deleteTask(id)
            loadTasks()
        } catch (error) {
            console.error('Failed to delete task:', error)
            alert('Failed to delete task')
        }
    }

    const handleRestore = async (task) => {
        try {
            await taskAPI.restoreTask(task.id, task)
            loadTasks()
        } catch (error) {
            console.error('Failed to restore task:', error)
            alert('Failed to restore task')
        }
    }

    if (loading) {
        return (
            <div className="page-container">
                <div className="loading">Loading completed tasks...</div>
            </div>
        )
    }

    return (
        <div className="page-container">
            <div className="page-header">
                <div>
                    <h1 className="page-title">✅ Completed Tasks</h1>
                    <p className="page-subtitle">Your finished QA study tasks</p>
                </div>
            </div>

            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-value">{tasks.length}</div>
                    <div className="stat-label">Completed Tasks</div>
                </div>
                <div className="stat-card">
                    <div className="stat-value">
                        {tasks.filter(t => t.priority === 'High').length}
                    </div>
                    <div className="stat-label">High Priority</div>
                </div>
                <div className="stat-card">
                    <div className="stat-value">
                        {tasks.filter(t => t.priority === 'Medium').length}
                    </div>
                    <div className="stat-label">Medium Priority</div>
                </div>
                <div className="stat-card">
                    <div className="stat-value">
                        {tasks.filter(t => t.priority === 'Low').length}
                    </div>
                    <div className="stat-label">Low Priority</div>
                </div>
            </div>

            <TaskTable
                tasks={tasks}
                onDelete={handleDelete}
                onRestore={handleRestore}
            />
        </div>
    )
}
