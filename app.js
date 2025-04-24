const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const { errorHandler } = require('./utils/errorHandler');
const path = require('path');



dotenv.config();

connectDB();

const app = express();

app.use(express.json());
app.use(morgan('dev'))

app.use('/api/course', require('./routes/courseRoutes.js'));


app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


 