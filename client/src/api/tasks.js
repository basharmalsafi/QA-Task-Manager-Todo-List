// Use explicit server origin to avoid origin/proxy mismatches during development
const API_BASE = 'http://localhost:3001/api';

export const taskAPI = {
    // Get all tasks with optional status filter
    getTasks: async (status = null) => {
        const url = status ? `${API_BASE}/tasks?status=${status}` : `${API_BASE}/tasks`;
        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch tasks');
        return response.json();
    },

    // Get single task
    getTask: async (id) => {
        const response = await fetch(`${API_BASE}/tasks/${id}`);
        if (!response.ok) throw new Error('Failed to fetch task');
        return response.json();
    },

    // Create task
    createTask: async (taskData) => {
        const response = await fetch(`${API_BASE}/tasks`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(taskData)
        });
        if (!response.ok) throw new Error('Failed to create task');
        return response.json();
    },

    // Update task
    updateTask: async (id, taskData) => {
        const response = await fetch(`${API_BASE}/tasks/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(taskData)
        });
        if (!response.ok) throw new Error('Failed to update task');
        return response.json();
    },

    // Delete task
    deleteTask: async (id) => {
        const response = await fetch(`${API_BASE}/tasks/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) throw new Error('Failed to delete task');
        return response.json();
    },

    // Mark task as completed
    completeTask: async (id, task) => {
        return taskAPI.updateTask(id, { ...task, status: 'completed' });
    },

    // Restore task to pending
    restoreTask: async (id, task) => {
        return taskAPI.updateTask(id, { ...task, status: 'pending' });
    }
};
