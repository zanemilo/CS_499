// server.js
const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware: serve static files from "public" folder
app.use(express.static(path.join(__dirname, 'public')));

// Optional: parse incoming JSON (if your frontend uses fetch with JSON)
app.use(express.json());

// Example API route
app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working!' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
