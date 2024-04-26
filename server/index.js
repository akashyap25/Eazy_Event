const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const port = process.env.PORT || 3000;
const cookieParser = require('cookie-parser');
const app = express();
const dotenv = require('dotenv').config();
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

app.use("/", authRoutes);
app.use("/events", eventRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
