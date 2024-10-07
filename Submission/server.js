const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql');
const sse = require('express-sse');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Koneksi ke database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'database_name'
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to database');
});

// Route untuk mengirimkan data ke dashboard
app.post('/submit', (req, res) => {
  const formData = req.body;
  // Validate form data
  // ...

  // Simpan data ke database
  db.query('INSERT INTO submissions SET ?', formData, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send({ message: 'Error submitting form' });
    } else {
      // Kirimkan data ke dashboard
      sse.send('newSubmission', formData);
      res.send({ message: 'Form submitted successfully' });
    }
  });
});

// Route untuk mengambil data dari database untuk dashboard
app.get('/dashboard', (req, res) => {
  res.sseSetup();
  res.sseSend('init', { message: 'Dashboard initialized' });

  db.query('SELECT * FROM submissions ORDER BY id DESC LIMIT 10', (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send({ message: 'Error fetching dashboard data' });
    } else {
      res.sseSend('dashboardData', results);
    }
  });
});

// Route untuk mengupdate dashboard ketika data baru masuk
app.post('/update-dashboard', (req, res) => {
  const newData = req.body;
  // Update dashboard dengan data baru
  db.query('UPDATE submissions SET ? WHERE id = ?', [newData, newData.id], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send({ message: 'Error updating dashboard' });
    } else {
      res.send({ message: 'Dashboard updated successfully' });
    }
  });
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});

