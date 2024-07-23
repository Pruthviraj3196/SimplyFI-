const mongoose = require('mongoose');

const articleLikeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  articleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Article', required: true },
});

module.exports = mongoose.model('ArticleLike', articleLikeSchema);
