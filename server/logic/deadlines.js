/**
 * Calculate the deadline status for a task
 * @param {string} dueDate - ISO date string
 * @param {string} status - Task status (pending, in-progress, completed)
 * @returns {string} - 'overdue', 'due-soon', 'normal', or 'completed'
 */
export function getDeadlineStatus(dueDate, status) {
    if (status === 'completed') {
        return 'completed';
    }

    if (!dueDate) {
        return 'normal';
    }

    const now = new Date();
    const due = new Date(dueDate);
    const diffMs = due - now;
    const diffHours = diffMs / (1000 * 60 * 60);

    // Overdue
    if (diffMs < 0) {
        return 'overdue';
    }

    // Due soon (within 48 hours)
    if (diffHours <= 48) {
        return 'due-soon';
    }

    return 'normal';
}

/**
 * Get color code for deadline status
 */
export function getDeadlineColor(deadlineStatus) {
    const colors = {
        overdue: '#ef4444',      // Red
        'due-soon': '#f59e0b',   // Yellow/Orange
        normal: '#10b981',       // Green
        completed: '#10b981'     // Green
    };
    return colors[deadlineStatus] || colors.normal;
}
