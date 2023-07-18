// create web server
// create web server
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const port = 4001;
const comments = require('./comments.json');
const fs = require('fs');

app.use(cors());
app.use(bodyParser.json());

app.get('/comments', (req, res) => {
  res.json(comments);
});

app.post('/comments', (req, res) => {
  const newComment = req.body;
  newComment.id = comments.length + 1;
  comments.push(newComment);
  fs.writeFile('./comments.json', JSON.stringify(comments), () => {
    res.json(comments);
  });
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});