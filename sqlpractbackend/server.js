import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB, { initializeDatabase } from './config/db.js';
import studentRoutes from './routes/studentRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api/students', studentRoutes);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(5000, () => {
    console.log('Server is running on port 5000 http://localhost:5000');

    initializeDatabase((initializeError) => {
        if (initializeError) {
            console.log('Error preparing database', initializeError);
            return;
        }

        connectDB.connect((err) => {
            if (err) {
                console.log('Error connecting to database', err);
            } else {
                console.log('Connected to database');
            }
        });
    });
});
