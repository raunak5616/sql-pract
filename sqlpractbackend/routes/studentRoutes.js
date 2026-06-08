import express from 'express';
import { addStudent, getStudents } from '../models/studentmodel.js';

const router = express.Router();

router.get('/', (req, res) => {
    getStudents((error, results) => {
        if (error) {
            res.status(500).json({
                message: 'Failed to fetch students',
                error: error.message
            });
            return;
        }

        res.status(200).json(results);
    });
});

router.post('/', (req, res) => {
    const { name, email, course, age } = req.body;

    if (!name || !email || !course || age === undefined) {
        res.status(400).json({
            message: 'name, email, course and age are required'
        });
        return;
    }

    addStudent({ name, email, course, age }, (error, result) => {
        if (error) {
            res.status(500).json({
                message: 'Failed to add student',
                error: error.message
            });
            return;
        }

        res.status(201).json({
            message: 'Student added successfully',
            studentId: result.insertId
        });
    });
});

export default router;
