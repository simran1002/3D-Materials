const express = require('express');
const connectDB = require('./config/db'); // Make sure the path is correct
const materialRoutes = require('./routes/materialRoutes');
const config = require('./config/config'); // Ensure the correct path

const app = express();
app.use(express.json());
app.use('/uploads', express.static('uploads'));

connectDB(); // Connect to the database

app.use('/api', materialRoutes);

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});
