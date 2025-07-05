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

// Temp Middleware: parse incoming JSON (for frontend using fetch with JSON)
app.use(express.json());

// Middleware: serve static files from "public" folder
app.use(express.static(path.join(__dirname, 'public')));

// Middleware: parse incoming JSON (frontend uses fetch with JSON)
app.post('/api/search', (req, res) => {
  const selectedIngredients = req.body.ingredients || [];

  // Create user vector: 1 if vocab word is present in input
  const userVector = vocabulary.map(word =>
    selectedIngredients.includes(word) ? 1 : 0
  );

  // Score each recipe using dot product
  const scoredRecipes = recipes.map(recipe => {
    const score = recipe.vector.reduce(
      (sum, val, i) => sum + val * userVector[i],
      0
    );
    return { name: recipe.name, score };
  });

  // Sort descending, return top 5 with score > 0
  const topRecipes = scoredRecipes
    .filter(r => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);

  res.json({ recipes: topRecipes });
});

// Example API route
app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working!' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
