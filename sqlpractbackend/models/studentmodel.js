import db from '../config/db.js';

const getStudents = (callback) =>{
    db.query('SELECT * FROM students',callback);
};

const addStudent = (data,callback)=>{
    db.query('INSERT INTO students(name,email,course,age) VALUES(?,?,?,?)',
        [data.name,
        data.email,
        data.course,
        data.age
        ],
        callback
    );
};

export {getStudents,addStudent};