const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  body: { type: String, required: true },
  likes: { type: Number, default: 0 },
  views: { type: Number, default: 0 },
});

module.exports = mongoose.model('Article', articleSchema);
