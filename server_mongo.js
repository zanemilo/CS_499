// server_mongo.js
require('dotenv').config(); // Load environment variables
const express = require('express');
const path = require('path');
const fs = require('fs');
const connectDB = require('./server/config/db');
const Recipe = require('./server/models/Recipe');

const app = express();
const PORT = process.env.PORT || 3000;

// Load vocabulary for ingredient vectorization
const vocabularyPath = path.join(__dirname, 'data', 'vocabulary.json');
const vocabulary = JSON.parse(fs.readFileSync(vocabularyPath, 'utf8'));

app.use(express.json()); // Parse JSON bodies
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files
app.use('/data', express.static(path.join(__dirname, 'data'))); // Serve data files

// Connect to MongoDB
const { MONGODB_URI } = process.env;
connectDB(MONGODB_URI);

// --- Helpers ---
// Compute dot product of two vectors
const dot = (a, b) => {
    let s = 0, n = Math.min(a.length, b.length);
    for (let i = 0; i < n; i++) s += (a[i] || 0) * (b[i] || 0);
    return s;
};

// --- Routes ---
// Get paginated recipes
app.get('/api/recipes', async (req, res) => {
    try {
        const page = Math.max(parseInt(req.query.page) || 1, 1);
        const limit = Math.min(parseInt(req.query.limit) || 50, 200);
        const skip = (page - 1) * limit;
        const [items, total] = await Promise.all([
            Recipe.find().skip(skip).limit(limit).lean(),
            Recipe.countDocuments()
        ]);
        res.json({ items, total, page, pages: Math.ceil(total / limit) });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

// Create a new recipe
app.post('/api/recipes', async (req, res) => {
    try {
        const body = req.body || {};
        // Generate vector from ingredients if missing
        if (!Array.isArray(body.vector) && Array.isArray(body.ingredients)) {
            const set = new Set(body.ingredients.map(s => String(s).toLowerCase()));
            body.vector = vocabulary.map(w => set.has(String(w).toLowerCase()) ? 1 : 0);
        }
        const created = await Recipe.create(body);
        res.status(201).json(created);
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
});

// Search recipes by ingredients
app.post('/api/search', async (req, res) => {
    try {
        const selected = (req.body.ingredients || []).map(s => String(s).toLowerCase());
        const userVector = vocabulary.map(w => selected.includes(String(w).toLowerCase()) ? 1 : 0);

        const docs = await Recipe.find({}, { name: 1, ingredients: 1, vector: 1, tags: 1, instructions: 1 }).lean();
        const scored = docs.map(r => ({ ...r, score: dot(userVector, r.vector || []) }))
            .filter(r => r.score > 0)
            .sort((a, b) => b.score - a.score)
            .slice(0, 50);

        res.json({ results: scored, count: scored.length });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => res.json({ ok: true }));

// Start server
app.listen(PORT, () => {
    console.log(`Server (Mongo) listening on http://localhost:${PORT}`);
});
