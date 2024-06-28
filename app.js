const express = require('express');
const connectDB = require('./config/db');
const materialRoutes = require('./routes/materialRoutes');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();
connectDB();

app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api', materialRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
