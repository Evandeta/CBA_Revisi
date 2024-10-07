const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

// Middleware to parse JSON requests
app.use(bodyParser.json());

// CORS settings (optional, if needed for frontend calls)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Route to handle form submissions
app.post('/appointments', (req, res) => {
  const appointmentData = req.body;
  console.log('Received appointment:', appointmentData);
  
  // Simulate saving the data (you can save to a database here)
  // For now, just respond with success
  res.json({ message: 'Appointment successfully submitted', data: appointmentData });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
