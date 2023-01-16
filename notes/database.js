// Get the client
import mysql from 'mysql2';

// Use .env file
import dotenv from 'dotenv';
dotenv.config();

console.log(process.env.HOST);

// Create connection (Pool) to the database -> More efficient than creating a new connection for each query
const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
}).promise();

// Function for all notes
export const getNotes = async () => {
    const [rows] = await pool.query('SELECT * FROM `notes`;');
    return rows;
}

const notes = await getNotes();
//console.log(notes);

// Function for select a single note
export const getNote = async (id) => {
    const [rows] = await pool.query('SELECT * FROM `notes` WHERE `id` = ?;', [id]);
    return rows[0];
}

// Get single note
const note = await getNote(1);
//console.log(note)

// Create note
export const createNote = async (title, content) => {
    const [result] = await pool.query(`INSERT INTO notes(title, content) VALUES (?, ?)`, [title, content]);
    const resultId = result.insertId;
    return getNote(resultId);
}

//const result = await createNote('Test', 'Test content');
//console.log(result);