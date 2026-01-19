import { useState, useEffect } from 'react'
import './TaskModal.css'

export default function TaskModal({ task, onClose, onSave }) {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        startDate: '',
        dueDate: '',
        priority: 'Medium',
        tags: [],
        subtasks: [],
        status: 'pending'
    })
    const [tagInput, setTagInput] = useState('')
    const [subtaskInput, setSubtaskInput] = useState('')

    useEffect(() => {
        if (task) {
            setFormData({
                title: task.title || '',
                description: task.description || '',
                startDate: task.startDate || '',
                dueDate: task.dueDate || '',
                priority: task.priority || 'Medium',
                tags: task.tags || [],
                subtasks: task.subtasks || [],
                status: task.status || 'pending'
            })
        }
    }, [task])

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!formData.title.trim()) {
            alert('Title is required')
            return
        }
        onSave(formData)
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const addTag = () => {
        if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
            setFormData(prev => ({
                ...prev,
                tags: [...prev.tags, tagInput.trim()]
            }))
            setTagInput('')
        }
    }

    const addSubtask = () => {
        const title = subtaskInput.trim()
        if (!title) return

        setFormData(prev => ({
            ...prev,
            subtasks: [...(prev.subtasks || []), { id: Date.now(), title, status: 'pending' }]
        }))
        setSubtaskInput('')
    }

    const removeSubtask = (id) => {
        setFormData(prev => ({
            ...prev,
            subtasks: (prev.subtasks || []).filter(s => s.id !== id)
        }))
    }

    const toggleSubtaskStatus = (id) => {
        setFormData(prev => ({
            ...prev,
            subtasks: (prev.subtasks || []).map(s => s.id === id ? { ...s, status: s.status === 'completed' ? 'pending' : 'completed' } : s)
        }))
    }

    const removeTag = (tagToRemove) => {
        setFormData(prev => ({
            ...prev,
            tags: prev.tags.filter(tag => tag !== tagToRemove)
        }))
    }

    const handleTagKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            addTag()
        }
    }

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>{task?.id ? 'Edit Task' : 'Create New Task'}</h2>
                    <button className="btn-close" onClick={onClose}>✕</button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="title">Title *</label>
                        <input
                            id="title"
                            name="title"
                            type="text"
                            className="input"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Enter task title"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            className="textarea"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Enter task description"
                        />
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="startDate">Start Date</label>
                            <input
                                id="startDate"
                                name="startDate"
                                type="date"
                                className="input"
                                value={formData.startDate}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="dueDate">Due Date</label>
                            <input
                                id="dueDate"
                                name="dueDate"
                                type="date"
                                className="input"
                                value={formData.dueDate}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="priority">Priority</label>
                            <select
                                id="priority"
                                name="priority"
                                className="select"
                                value={formData.priority}
                                onChange={handleChange}
                            >
                                <option value="Low">Low</option>
                                <option value="Medium">Medium</option>
                                <option value="High">High</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="status">Status</label>
                            <select
                                id="status"
                                name="status"
                                className="select"
                                value={formData.status}
                                onChange={handleChange}
                            >
                                <option value="pending">Pending</option>
                                <option value="in-progress">In Progress</option>
                                <option value="completed">Completed</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="tags">Tags</label>
                        <div className="tag-input-container">
                            <input
                                id="tags"
                                name="tagInput"
                                type="text"
                                className="input"
                                value={tagInput}
                                onChange={(e) => setTagInput(e.target.value)}
                                onKeyPress={handleTagKeyPress}
                                placeholder="Add a tag and press Enter"
                            />
                            <button type="button" className="btn btn-secondary" onClick={addTag}>
                                Add
                            </button>
                        </div>
                        {formData.tags.length > 0 && (
                            <div className="tags-list">
                                {formData.tags.map((tag, idx) => (
                                    <span key={idx} className="tag-item">
                                        {tag}
                                        <button
                                            type="button"
                                            className="tag-remove"
                                            onClick={() => removeTag(tag)}
                                        >
                                            ✕
                                        </button>
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="subtasks">Subtasks</label>
                        <div className="tag-input-container">
                            <input
                                id="subtasks"
                                name="subtaskInput"
                                type="text"
                                className="input"
                                value={subtaskInput}
                                onChange={(e) => setSubtaskInput(e.target.value)}
                                onKeyPress={(e) => { if (e.key === 'Enter') { e.preventDefault(); addSubtask() } }}
                                placeholder="Add a subtask and press Enter"
                            />
                            <button type="button" className="btn btn-secondary" onClick={addSubtask}>
                                Add
                            </button>
                        </div>

                        {(formData.subtasks || []).length > 0 && (
                            <ul className="subtasks-list">
                                {formData.subtasks.map(s => (
                                    <li key={s.id} className="subtask-item">
                                        <label>
                                            <input name={`subtask-${s.id}`} aria-label={`Toggle subtask ${s.title}`} type="checkbox" checked={s.status === 'completed'} onChange={() => toggleSubtaskStatus(s.id)} />
                                            <span className={s.status === 'completed' ? 'subtask-completed' : ''}>{s.title}</span>
                                        </label>
                                        <button type="button" className="tag-remove" onClick={() => removeSubtask(s.id)}>✕</button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    <div className="modal-actions">
                        <button type="button" className="btn btn-secondary" onClick={onClose}>
                            Cancel
                        </button>
                        <button type="submit" className="btn btn-primary">
                            {task?.id ? 'Update Task' : 'Create Task'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
