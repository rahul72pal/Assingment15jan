const express = require('express');
const cors = require('cors'); // Import the cors package
const vehicleRouter = require('./routes/vehicle'); // Adjust the path as necessary

const app = express();

// CORS configuration
const corsOptions = {
    origin: 'http://localhost:5173', 
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], 
    credentials: true,
};

// Use CORS middleware
app.use(cors(corsOptions));

// Middleware to parse JSON bodies
app.use(express.json());

// Use the vehicle router
app.use('/api/vehicles', vehicleRouter);

// Define a port
const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});