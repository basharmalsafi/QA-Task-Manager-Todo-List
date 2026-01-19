import { useState, useEffect } from 'react'
import TaskTable from '../components/TaskTable'
import TaskModal from '../components/TaskModal'
import { taskAPI } from '../api/tasks'
import './TodoPage.css'

export default function TodoPage() {
    const [tasks, setTasks] = useState([])
    const [loading, setLoading] = useState(true)
    const [showModal, setShowModal] = useState(false)
    const [editingTask, setEditingTask] = useState(null)

    useEffect(() => {
        loadTasks()
    }, [])

    const loadTasks = async () => {
        try {
            setLoading(true)
            const data = await taskAPI.getTasks()
            // Filter for non-completed tasks
            setTasks(data.filter(t => t.status !== 'completed'))
        } catch (error) {
            console.error('Failed to load tasks:', error)
            alert('Failed to load tasks. Make sure the server is running.')
        } finally {
            setLoading(false)
        }
    }

    const handleCreate = () => {
        setEditingTask(null)
        setShowModal(true)
    }

    const handleEdit = (task) => {
        setEditingTask(task)
        setShowModal(true)
    }

    const handleSave = async (formData) => {
        try {
            if (editingTask?.id) {
                await taskAPI.updateTask(editingTask.id, formData)
            } else {
                await taskAPI.createTask(formData)
            }
            setShowModal(false)
            setEditingTask(null)
            loadTasks()
        } catch (error) {
            console.error('Failed to save task:', error)
            alert('Failed to save task')
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

    const handleComplete = async (task) => {
        try {
            await taskAPI.completeTask(task.id, task)
            loadTasks()
        } catch (error) {
            console.error('Failed to complete task:', error)
            alert('Failed to complete task')
        }
    }

    const handleToggleSubtask = async (task, subtaskId, newStatus) => {
        try {
            const updatedSubtasks = (task.subtasks || []).map(s => s.id === subtaskId ? { ...s, status: newStatus } : s)
            await taskAPI.updateTask(task.id, { ...task, subtasks: updatedSubtasks })
            loadTasks()
        } catch (error) {
            console.error('Failed to update subtask:', error)
            alert('Failed to update subtask')
        }
    }

    if (loading) {
        return (
            <div className="page-container">
                <div className="loading">Loading tasks...</div>
            </div>
        )
    }

    return (
        <div className="page-container">
            <div className="page-header">
                <div>
                    <h1 className="page-title">📝 To-Do Tasks</h1>
                    <p className="page-subtitle">Manage your QA study tasks</p>
                </div>
                <button className="btn btn-primary" onClick={handleCreate}>
                    ➕ Add Task
                </button>
            </div>

            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-value">{tasks.length}</div>
                    <div className="stat-label">Total Tasks</div>
                </div>
                <div className="stat-card">
                    <div className="stat-value">
                        {tasks.filter(t => t.deadlineStatus === 'overdue').length}
                    </div>
                    <div className="stat-label">Overdue</div>
                </div>
                <div className="stat-card">
                    <div className="stat-value">
                        {tasks.filter(t => t.deadlineStatus === 'due-soon').length}
                    </div>
                    <div className="stat-label">Due Soon</div>
                </div>
                <div className="stat-card">
                    <div className="stat-value">
                        {tasks.filter(t => t.priority === 'High').length}
                    </div>
                    <div className="stat-label">High Priority</div>
                </div>
            </div>

            <TaskTable
                tasks={tasks}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onComplete={handleComplete}
                onToggleSubtask={handleToggleSubtask}
            />

            {showModal && (
                <TaskModal
                    task={editingTask}
                    onClose={() => {
                        setShowModal(false)
                        setEditingTask(null)
                    }}
                    onSave={handleSave}
                />
            )}
        </div>
    )
}
