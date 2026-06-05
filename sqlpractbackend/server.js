import 'dotenv/config';
import express from 'express';
import connectDB, { initializeDatabase } from './config/db.js';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());

app.listen(5000,()=>{
    console.log('Server is running on port 5000');
    initializeDatabase((initializeError) => {
        if (initializeError) {
            console.log('Error preparing database', initializeError);
            return;
        }

        connectDB.connect((err)=>{
            if(err){
                console.log('Error connecting to database',err);
            }else{
                console.log('Connected to database');
            }
        });
    });
});
