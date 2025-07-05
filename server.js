// server.js
const express = require('express');
const path = require('path');
const fs = require('fs'); // Node.js file system module to read files
const app = express();
const PORT = process.env.PORT || 3000;


const vocabularyPath = path.join(__dirname, 'data', 'vocabulary.json');
const vocabulary = JSON.parse(fs.readFileSync(vocabularyPath, 'utf8'));

const recipesPath = path.join(__dirname, 'data', 'recipes.json');
const recipes = JSON.parse(fs.readFileSync(recipesPath, 'utf8'));

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
