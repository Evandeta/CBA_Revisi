// api.js
const express = require('express');
const app = express();

// route untuk submission
app.post('/api/submissions', (req, res) => {
  const submission = req.body;
  // simpan data di database
  res.json(submission);
});

// route untuk appointment
app.post('/api/appointments', (req, res) => {
  const appointment = req.body;
  // simpan data di database
  res.json(appointment);
});

// route untuk fetch data submission
app.get('/api/submissions', (req, res) => {
  // fetch data dari database
  const submissions = [];
  res.json(submissions);
});

// route untuk fetch data appointment
app.get('/api/appointments', (req, res) => {
  // fetch data dari database
  const appointments = [];
  res.json(appointments);
});