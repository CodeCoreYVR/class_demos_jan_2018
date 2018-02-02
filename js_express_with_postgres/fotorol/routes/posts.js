const express = require('express');
// const knex = require('../db/index');
// When requiring a directory, node will look
// for a file named `index.js` inside of it and
// require that instead.
const knex = require('../db');
const router = express.Router();



// Posts#create PATH: /posts/ VERB: POST
// This route has the responsibility of
// creating posts in the posts table.
router.post('/', (req, res) => {
  const description = req.body.description;
  const pictureUrl = req.body.pictureUrl;
  const username = req.cookies.username;

  knex
    .insert({
      description: description,
      pictureUrl: pictureUrl,
      username: username
    })
    .into('posts')
    .then(() => {
      // Database queries with knex are asynchronous like
      // setTimeout and setInterval. If you want to write
      // ANY CODE that depends on results from a query, you
      // must do it inside of the callback for `then`.
      res.redirect('/posts');
    });
});

// Posts#index PATH: /posts/ VERB: GET
// Doing a GET should on posts a listing of all the posts.
router.get('/', (req, res) => {
  knex
    .select()
    .from('posts')
    .orderBy('created_at', 'DESC')
    .then(posts => {
      res.render('posts/index', {posts: posts});
    });
});

// Posts#new PATH: /posts/new VERB: GET
// This route has the responsibility of
// serving a form for creating new posts
router.get('/new', (req, res) => {
  res.render('posts/new');
});

// Routes execute in order. The first that matches is the only
// that will be executed. Make sure routes with more specific
// paths appear first.

// Posts#show PATH: /posts/:id VERB: GET
// Display a single post from the db
router.get('/:id', (req, res, next) => {
  // Paths that have `:` in their name will ne stored as a key value
  // in req.params. Use it to the `id` of a post.
  console.log(req.params);
  const postId = req.params.id;

  if (isNaN(parseInt(postId, 10))) {
    return res.redirect('/')
  }

  knex
    .first() // replace select with first when you only want one row
    .from('posts')
    .where({id: postId})
    .then(post => {
      res.render('posts/show', {post: post || {}});
    })
});




module.exports = router;
