const mongoose = require('mongoose');

const materialSchema = new mongoose.Schema({
  name: { type: String, required: true },
  technology: { type: String, required: true },
  colors: { type: [String], required: true },
  pricePerGram: { type: Number, required: true },
  applicationTypes: { type: [String], required: true },
  imageUrl: { type: String, required: true },
});

module.exports = mongoose.model('Material', materialSchema);
