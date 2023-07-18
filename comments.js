// create web server for comments

// load modules
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

// create web server
const app = express();

// set port
const port = 3000;

// use body-parser
app.use(bodyParser.urlencoded({ extended: false }));

// set static directory
app.use(express.static(path.join(__dirname, 'public')));

// set view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// create comments array
let comments = [
    { name: 'John', message: 'Hello World!' },
    { name: 'Jane', message: 'Hi, there!' },
    { name: 'Joe', message: 'How are you?' }
];

// create route for GET /comments
app.get('/comments', (req, res) => {
    res.render('comments', { comments });
});

// create route for POST /comments
app.post('/comments', (req, res) => {
    // add new comment to comments array
    comments.push({ name: req.body.name, message: req.body.message });
    // write comments array to comments.json
    fs.writeFile('comments.json', JSON.stringify(comments), (err) => {
        if (err) {
            console.log(err);
        }
    });
    // redirect to /comments
    res.redirect('/comments');
});

// create route for GET /comments.json
app.get('/comments.json', (req, res) => {
    // read comments.json
    fs.readFile('comments.json', (err, data) => {
        if (err) {
            console.log(err);
        }
        // send comments array as JSON
        res.json(JSON.parse(data));
    });
});

// start server
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});