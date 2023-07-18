// create web server
// using node.js

// set up http server
var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');

// create server
http.createServer(function (req, res) {
    var pathname = url.parse(req.url).pathname;
    var ext = path.extname(pathname);
    if (ext) {
        // if file is a css or js file
        fs.readFile(__dirname + pathname, function (err, data) {
            if (err) {
                res.writeHead(404);
                res.end();
            }
            else {
                // set correct content type
                res.setHeader('Content-Type', getContentType(ext));
                res.end(data);
            }
        });
    }
    else {
        // if file is not a css or js file
        fs.readFile(__dirname + '/index.html', function (err, data) {
            if (err) {
                res.writeHead(404);
                res.end();
            }
            else {
                // set content type to html
                res.setHeader('Content-Type', 'text/html');
                res.end(data);
            }
        });
    }
}).listen(8080);

// get content type based on extension
function getContentType(ext) {
    var contentType;
    switch (ext) {
        case '.css':
            contentType = 'text/css';
            break;
        case '.js':
            contentType = 'application/javascript';
            break;
    }
    return contentType;
}