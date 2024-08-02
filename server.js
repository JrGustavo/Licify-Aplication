const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const app = express();
require('dotenv').config();

connectDB();

app.use(cors());
app.use(express.json());
app.use('/api/auth', require('./routes/auth'));
app.use('/api/projects', require('./routes/projects'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));