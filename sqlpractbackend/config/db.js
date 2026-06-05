import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import path from 'path'
import mysql from 'mysql'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME
};

const connectDB = mysql.createConnection(dbConfig);

const initializeDatabase = (callback) => {
    const setupConnection = mysql.createConnection({
        host: dbConfig.host,
        user: dbConfig.user,
        password: dbConfig.password
    });

    setupConnection.connect((connectError) => {
        if (connectError) {
            callback(connectError);
            return;
        }

        setupConnection.query(
            `CREATE DATABASE IF NOT EXISTS \`${dbConfig.database}\``,
            (databaseError) => {
                if (databaseError) {
                    setupConnection.end();
                    callback(databaseError);
                    return;
                }

                setupConnection.query(`USE \`${dbConfig.database}\``, (useError) => {
                    if (useError) {
                        setupConnection.end();
                        callback(useError);
                        return;
                    }

                    setupConnection.query(
                        `CREATE TABLE IF NOT EXISTS students (
                            id INT AUTO_INCREMENT PRIMARY KEY,
                            name VARCHAR(200),
                            email VARCHAR(200),
                            course VARCHAR(200),
                            age INT
                        )`,
                        (tableError) => {
                            setupConnection.end();
                            callback(tableError);
                        }
                    );
                });
            }
        );
    });
};

export { initializeDatabase };
export default connectDB;
