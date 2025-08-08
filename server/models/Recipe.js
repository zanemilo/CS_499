// server/models/Recipe.js
const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
  name: { type: String, required: true, index: true },
  ingredients: { type: [String], default: [], index: true },
  vector: { type: [Number], default: [] },     // aligns with vocabulary.json
  instructions: { type: String, default: '' },
  tags: { type: [String], default: [], index: true },
  image: { type: String },
  url: { type: String },
  nutrition: { type: Object }
}, { timestamps: true });

module.exports = mongoose.model('Recipe', RecipeSchema);
