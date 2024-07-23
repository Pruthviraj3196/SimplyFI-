const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const Article = require('./models/Article');
const User = require('./models/User');
const ArticleLike = require('./models/ArticleLike');
const ArticleView = require('./models/ArticleView');
const Notification = require('./models/Notification');

const app = express();
const PORT = 3000;

mongoose.connect('mongodb://localhost:27017/nodejs-backend-assignment', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(bodyParser.json());

// Caching mechanism (simple in-memory cache)
const popularArticlesCache = new Map();

function updatePopularArticles(articleId, type) {
  if (!popularArticlesCache.has(articleId)) {
    popularArticlesCache.set(articleId, { likes: 0, views: 0 });
  }
  const articleStats = popularArticlesCache.get(articleId);
  articleStats[type]++;
  popularArticlesCache.set(articleId, articleStats);
}

// API Endpoints
app.post('/articles', async (req, res) => {
  const { title, author, body } = req.body;
  const article = new Article({ title, author, body });
  await article.save();
  res.status(201).send(article);
});

app.post('/users', async (req, res) => {
  const { name } = req.body;
  const user = new User({ name });
  await user.save();
  res.status(201).send(user);
});

app.post('/articles/:id/like', async (req, res) => {
  const { userId } = req.body;
  const articleId = req.params.id;

  const articleLike = new ArticleLike({ userId, articleId });
  await articleLike.save();

  const article = await Article.findById(articleId);
  article.likes++;
  await article.save();

  updatePopularArticles(articleId, 'likes');

  const notification = new Notification({
    userId: article.author,
    articleId,
    message: `Your article "${article.title}" was liked!`,
  });
  await notification.save();

  res.status(200).send(article);
});

app.post('/articles/:id/view', async (req, res) => {
  const { userId } = req.body;
  const articleId = req.params.id;

  const articleView = new ArticleView({ userId, articleId });
  await articleView.save();

  const article = await Article.findById(articleId);
  article.views++;
  await article.save();

  updatePopularArticles(articleId, 'views');

  res.status(200).send(article);
});

app.get('/notifications', async (req, res) => {
  const notifications = await Notification.find();
  res.status(200).send(notifications);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
