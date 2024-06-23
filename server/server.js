const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const connectDB = require('./utils/db');
const authRoutes = require('./routes/auth');
const passwordRoutes = require('./routes/passwords');
const cors = require('cors')


const app = express();
const port = 8080;

// Connect to MongoDB
connectDB();

// Middleware
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors())

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', passwordRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
