const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
 // If you are using Express
 // Import the CORS package


const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Import quiz routes
const quizRoutes = require('./routes/quiz');
app.use('/api/quizzes', quizRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("Error connecting to MongoDB:", err));

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
