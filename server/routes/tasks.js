import express from 'express';
import { db } from '../db.js';
import { getDeadlineStatus } from '../logic/deadlines.js';

const router = express.Router();

// GET all tasks (with optional status filter)
router.get('/', (req, res) => {
    try {
        const { status } = req.query;
        let tasks = db.getAllTasks();

        if (status) {
            tasks = tasks.filter(task => task.status === status);
        }

        // Add deadline status to each task
        const tasksWithStatus = tasks.map(task => ({
            ...task,
            deadlineStatus: getDeadlineStatus(task.dueDate, task.status)
        }));

        res.json(tasksWithStatus);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET single task
router.get('/:id', (req, res) => {
    try {
        const task = db.getTaskById(req.params.id);

        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }

        task.deadlineStatus = getDeadlineStatus(task.dueDate, task.status);
        res.json(task);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST create task
router.post('/', (req, res) => {
    try {
        const { title, description, startDate, dueDate, priority, tags, status } = req.body;

        if (!title) {
            return res.status(400).json({ error: 'Title is required' });
        }

        const newTask = db.createTask({
            title,
            description,
            startDate,
            dueDate,
            priority,
            tags,
            status
        });

        newTask.deadlineStatus = getDeadlineStatus(newTask.dueDate, newTask.status);
        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// PUT update task
router.put('/:id', (req, res) => {
    try {
        const { title, description, startDate, dueDate, priority, tags, status } = req.body;

        const updatedTask = db.updateTask(req.params.id, {
            title,
            description,
            startDate,
            dueDate,
            priority,
            tags,
            status
        });

        if (!updatedTask) {
            return res.status(404).json({ error: 'Task not found' });
        }

        updatedTask.deadlineStatus = getDeadlineStatus(updatedTask.dueDate, updatedTask.status);
        res.json(updatedTask);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// DELETE task
router.delete('/:id', (req, res) => {
    try {
        const deleted = db.deleteTask(req.params.id);

        if (!deleted) {
            return res.status(404).json({ error: 'Task not found' });
        }

        res.json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
