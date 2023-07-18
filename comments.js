// create web server
// run node comments.js
// open browser and visit
// http://localhost:3000/comments
// http://localhost:3000/comments/new

var http = require('http');
var fs = require('fs');
var qs = require('querystring');
var comments = [];

http.createServer(function(req, res) {
  if (req.url === '/' && req.method === 'GET') {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(fs.readFileSync('./comments.html'));
  } else if (req.url === '/comments' && req.method === 'GET') {
    var data = JSON.stringify(comments);
    res.writeHead(200, {'Content-Type': 'application/json', 'Content-Length': data.length});
    res.end(data);
  } else if (req.url === '/comments' && req.method === 'POST') {
    var body = '';
    req.on('data', function(chunk) {
      body += chunk;
    });
    req.on('end', function() {
      var comment = qs.parse(body);
      comments.push(comment);
      res.end('success');
    });
  } else {
    res.statusCode = 404;
    res.end();
  }
}).listen(3000);