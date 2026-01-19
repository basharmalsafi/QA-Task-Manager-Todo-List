import React, { useState, useMemo } from 'react'
import './TaskTable.css'

export default function TaskTable({ tasks = [], onEdit, onDelete, onComplete, onRestore, onToggleSubtask, showActions = true }) {
    const [sortField, setSortField] = useState('createdAt')
    const [sortDirection, setSortDirection] = useState('desc')
    const [searchTerm, setSearchTerm] = useState('')
    const [filterPriority, setFilterPriority] = useState('all')
    const [filterTag, setFilterTag] = useState('all')

    const allTags = useMemo(() => [...new Set(tasks.flatMap(task => task.tags || []))], [tasks])

    const filteredTasks = useMemo(() => {
        return tasks.filter(task => {
            const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (task.description || '').toLowerCase().includes(searchTerm.toLowerCase())
            const matchesPriority = filterPriority === 'all' || task.priority === filterPriority
            const matchesTag = filterTag === 'all' || (task.tags || []).includes(filterTag)
            return matchesSearch && matchesPriority && matchesTag
        })
    }, [tasks, searchTerm, filterPriority, filterTag])

    const sortedTasks = useMemo(() => {
        const copy = [...filteredTasks]
        copy.sort((a, b) => {
            let aVal = a[sortField]
            let bVal = b[sortField]
            if (sortField === 'dueDate' || sortField === 'startDate') {
                aVal = aVal ? new Date(aVal) : new Date(0)
                bVal = bVal ? new Date(bVal) : new Date(0)
            }
            if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1
            if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1
            return 0
        })
        return copy
    }, [filteredTasks, sortField, sortDirection])

    const handleSort = (field) => {
        if (sortField === field) {
            setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc')
        } else {
            setSortField(field)
            setSortDirection('asc')
        }
    }

    const formatDate = (dateString) => {
        if (!dateString) return '-'
        return new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    }

    const getDeadlineBadgeClass = (deadlineStatus) => `badge badge-${deadlineStatus}`
    const getPriorityBadgeClass = (priority) => `badge badge-${priority.toLowerCase()}`

    return (
        <div className="task-table-container">
            <div className="table-filters">
                <input
                    name="search"
                    type="text"
                    className="input search-input"
                    placeholder="🔍 Search tasks..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

                <select
                    name="filterPriority"
                    className="select filter-select"
                    value={filterPriority}
                    onChange={(e) => setFilterPriority(e.target.value)}
                >
                    <option value="all">All Priorities</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                </select>

                {allTags.length > 0 && (
                    <select
                        name="filterTag"
                        className="select filter-select"
                        value={filterTag}
                        onChange={(e) => setFilterTag(e.target.value)}
                    >
                        <option value="all">All Tags</option>
                        {allTags.map(tag => (
                            <option key={tag} value={tag}>{tag}</option>
                        ))}
                    </select>
                )}
            </div>

            <div className="table-wrapper">
                <table className="task-table">
                    <thead>
                        <tr>
                            <th onClick={() => handleSort('title')} className="sortable">
                                Title {sortField === 'title' && (sortDirection === 'asc' ? '↑' : '↓')}
                            </th>
                            <th onClick={() => handleSort('priority')} className="sortable">
                                Priority {sortField === 'priority' && (sortDirection === 'asc' ? '↑' : '↓')}
                            </th>
                            <th onClick={() => handleSort('startDate')} className="sortable">
                                Start Date {sortField === 'startDate' && (sortDirection === 'asc' ? '↑' : '↓')}
                            </th>
                            <th onClick={() => handleSort('dueDate')} className="sortable">
                                Due Date {sortField === 'dueDate' && (sortDirection === 'asc' ? '↑' : '↓')}
                            </th>
                            <th>Status</th>
                            <th>Tags</th>
                            {showActions && <th>Actions</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {sortedTasks.length === 0 ? (
                            <tr>
                                <td colSpan={showActions ? 7 : 6} className="empty-state">No tasks found</td>
                            </tr>
                        ) : (
                            sortedTasks.map(task => (
                                <tr key={task.id} className="fade-in">
                                    <td>
                                        <div className="task-title" title={task.description || ''}>{task.title}</div>
                                        {task.description && (
                                            <div className="task-description">{task.description}</div>
                                        )}
                                        {(task.subtasks || []).length > 0 && (
                                            <ul className="subtasks-display">
                                                {task.subtasks.map(s => (
                                                    <li key={s.id} className="subtask-display-item">
                                                        <label>
                                                            <input
                                                                name={`subtask-${task.id}-${s.id}`}
                                                                aria-label={`Toggle subtask ${s.title}`}
                                                                type="checkbox"
                                                                checked={s.status === 'completed'}
                                                                onChange={() => onToggleSubtask && onToggleSubtask(task, s.id, s.status === 'completed' ? 'pending' : 'completed')}
                                                            />
                                                            <span className={s.status === 'completed' ? 'subtask-completed' : ''}>{s.title}</span>
                                                        </label>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </td>
                                    <td>
                                        <span className={getPriorityBadgeClass(task.priority)}>{task.priority}</span>
                                    </td>
                                    <td>{formatDate(task.startDate)}</td>
                                    <td>{formatDate(task.dueDate)}</td>
                                    <td>
                                        <span className={getDeadlineBadgeClass(task.deadlineStatus)}>
                                            {task.deadlineStatus === 'overdue' && '🔴 Overdue'}
                                            {task.deadlineStatus === 'due-soon' && '🟡 Due Soon'}
                                            {task.deadlineStatus === 'normal' && '🟢 On Track'}
                                            {task.deadlineStatus === 'completed' && '✅ Done'}
                                        </span>
                                    </td>
                                    <td>
                                        <div className="tags">{(task.tags || []).map((tag, idx) => (<span key={idx} className="tag">{tag}</span>))}</div>
                                    </td>
                                    {showActions && (
                                        <td>
                                            <div className="action-buttons">
                                                {task.status !== 'completed' ? (
                                                    <>
                                                        <button className="btn-icon btn-edit" onClick={() => onEdit(task)} title="Edit">✏️</button>
                                                        <button className="btn-icon btn-complete" onClick={() => onComplete(task)} title="Mark Complete">✓</button>
                                                    </>
                                                ) : (
                                                    <button className="btn-icon btn-restore" onClick={() => onRestore(task)} title="Restore">↩️</button>
                                                )}
                                                <button className="btn-icon btn-delete" onClick={() => onDelete(task.id)} title="Delete">🗑️</button>
                                            </div>
                                        </td>
                                    )}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            <div className="table-footer">
                <span className="task-count">{sortedTasks.length} {sortedTasks.length === 1 ? 'task' : 'tasks'}</span>
            </div>
        </div>
    )
}
