import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DB_FILE = path.join(__dirname, 'tasks.json');

// Initialize database file if it doesn't exist
if (!fs.existsSync(DB_FILE)) {
  fs.writeFileSync(DB_FILE, JSON.stringify({ tasks: [], nextId: 1 }, null, 2));
}

// Read database
function readDB() {
  const data = fs.readFileSync(DB_FILE, 'utf8');
  return JSON.parse(data);
}

// Write database
function writeDB(data) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

// Database operations
export const db = {
  // Get all tasks
  getAllTasks() {
    const data = readDB();
    return data.tasks;
  },

  // Get task by ID
  getTaskById(id) {
    const data = readDB();
    return data.tasks.find(task => task.id === parseInt(id));
  },

  // Create task
  createTask(taskData) {
    const data = readDB();
    const newTask = {
      id: data.nextId++,
      title: taskData.title,
      description: taskData.description || '',
      startDate: taskData.startDate || null,
      dueDate: taskData.dueDate || null,
      priority: taskData.priority || 'Medium',
      tags: taskData.tags || [],
      subtasks: taskData.subtasks || [],
      status: taskData.status || 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    data.tasks.push(newTask);
    writeDB(data);
    return newTask;
  },

  // Update task
  updateTask(id, taskData) {
    const data = readDB();
    const index = data.tasks.findIndex(task => task.id === parseInt(id));
    if (index === -1) return null;

    data.tasks[index] = {
      ...data.tasks[index],
      ...taskData,
      updatedAt: new Date().toISOString()
    };
    writeDB(data);
    return data.tasks[index];
  },

  // Delete task
  deleteTask(id) {
    const data = readDB();
    const index = data.tasks.findIndex(task => task.id === parseInt(id));
    if (index === -1) return false;

    data.tasks.splice(index, 1);
    writeDB(data);
    return true;
  }
};

export default db;
