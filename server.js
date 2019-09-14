const express = require('express');
const app = express();
const path = require('path');
const { syncAndSeed, findAllTags, findAllPosts } = require('./db');

app.get('/api/tags', (req, res, next)=> {
  findAllTags()
    .then( tags => res.send(tags))
    .catch(next);
});

app.get('/api/posts', (req, res, next)=> {
  findAllPosts()
    .then( posts => res.send(posts))
    .catch(next);
});

app.get('/', (req, res, next)=> res.sendFile(path.join(__dirname, 'index.html')));

syncAndSeed()
  .then(()=> app.listen(3001, ()=> console.log('listening on port 3001')));
