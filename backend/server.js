const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const mongoose = require('mongoose')
const taskRoutes = require('./routes/taskRoutes')
const authRoutes = require('./routes/authRoutes')

require('dotenv').config();

const app = express();

connectDB();

app.use(cors({
    origin: '*'
}));
app.use(express.json());

app.get('/', (req, res) => {
    res.send("API Running...");
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});

app.use('/api/tasks', taskRoutes);
app.use('/api/auth', authRoutes)