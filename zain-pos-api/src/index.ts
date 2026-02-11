import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { initSocket } from './socket';
import authRoutes from './routes/auth';
import salesRoutes from './routes/sales';
import inventoryRoutes from './routes/inventory';
import invoicesRoutes from './routes/invoices';
import reportsRoutes from './routes/reports';
import syncRoutes from './routes/sync';

dotenv.config();

const app = express();
const httpServer = createServer(app); // Create HTTP server
const io = initSocket(httpServer); // Initialize Socket.IO

const PORT = process.env.PORT || 3001;

// Middleware
app.use(helmet());
app.use(cors({
    origin: process.env.CORS_ORIGIN || '*',
    credentials: true
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Routes
app.get('/', (req, res) => {
    res.json({
        message: '🚀 Zain POS API is running',
        endpoints: ['/api/auth', '/api/sales', '/api/inventory', '/api/invoices', '/api/reports'],
        health: '/health'
    });
});

app.use('/api/auth', authRoutes);
app.use('/api/sales', salesRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/invoices', invoicesRoutes);
app.use('/api/reports', reportsRoutes);
app.use('/api/sync', syncRoutes);

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Error handling
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error('SERVER ERROR:', err);
    res.status(500).json({ error: 'Something went wrong!', message: err.message });
});

httpServer.listen(PORT, () => {
    console.log(`🚀 API server running on http://localhost:${PORT}`);
});
