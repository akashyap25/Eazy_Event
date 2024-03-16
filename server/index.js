const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const port = process.env.PORT || 3000;
const cookieParser = require('cookie-parser');
const app = express();
const dotenv = require('dotenv').config();
const uri = process.env.MONGO_URI;
const authRoutes = require('./routes/authRoutes');
const eventRoutes = require('./routes/eventRoutes'); 

app.use(cors({
  origin: 'http://localhost:1234',
  credentials: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// Define a variable to hold the cached connection
let cachedDbConnection = null;

// Connect to the database function
const connectToDatabase = async () => {
  try {
    if (cachedDbConnection) {
      console.log('Using cached database connection');
      return Promise.resolve(cachedDbConnection);
    }

    const connection = await mongoose.connect(uri, {});

    cachedDbConnection = connection;
    console.log('Connected to the database');
    return connection;
  } catch (error) {
    console.error('Error connecting to database:', error);
    throw error;
  }
};

(async () => {
  try {
    await connectToDatabase();
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error('Error starting server:', error);
    process.exit(1);
  }
})();

app.use("/", authRoutes);
app.use("/events", eventRoutes);
