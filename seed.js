// seed.js
const fs = require('fs');
const path = require('path');
const connectDB = require('./server/config/db');
const Recipe = require('./server/models/Recipe');

const vocabularyPath = path.join(__dirname, 'data', 'vocabulary.json');
const recipesPath = path.join(__dirname, 'data', 'recipes.json');

(async () => {
  const MONGODB_URI = 'mongodb://127.0.0.1:27017/recipe_rec';
await connectDB(MONGODB_URI);

  const vocabulary = JSON.parse(fs.readFileSync(vocabularyPath, 'utf8'));
  const recipes = JSON.parse(fs.readFileSync(recipesPath, 'utf8'));

  const transformed = recipes.map(r => {
    const ingSet = new Set((r.ingredients || []).map(s => String(s).toLowerCase()));
    const vector = vocabulary.map(w => ingSet.has(String(w).toLowerCase()) ? 1 : 0);
    return {
      name: r.name || r.title || 'Untitled',
      ingredients: r.ingredients || [],
      vector: Array.isArray(r.vector) && r.vector.length === vocabulary.length ? r.vector : vector,
      instructions: r.instructions || '',
      tags: r.tags || []
    };
  });

  console.log(`Preparing to upsert ${transformed.length} recipes...`);

  for (const rec of transformed) {
    await Recipe.findOneAndUpdate({ name: rec.name }, { $set: rec }, { upsert: true, new: true });
  }

  const count = await Recipe.countDocuments();
  console.log(`Seeding complete. Recipes in DB: ${count}`);
  process.exit(0);
})().catch(err => {
  console.error('Seed failed:', err);
  process.exit(1);
});
