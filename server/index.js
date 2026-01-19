import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import tasksRouter from './routes/tasks.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// API routes
app.use('/api/tasks', tasksRouter);

// Serve client build (if present)
const CLIENT_DIST = path.join(__dirname, '../client/dist');
if (fs.existsSync(CLIENT_DIST)) {
    app.use(express.static(CLIENT_DIST));

    // SPA fallback - serve index.html for unmatched routes (except API)
    app.get('*', (req, res, next) => {
        if (req.path.startsWith('/api') || req.path === '/health') return next();
        res.sendFile(path.join(CLIENT_DIST, 'index.html'));
    });
} else {
    // Root route helpful message when client isn't built
    app.get('/', (req, res) => {
        res.json({ message: 'Server running. Client not built. Start the client dev server or build the client.' });
    });
}

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
