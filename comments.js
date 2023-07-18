// create web server

// 1. load modules
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const fs = require('fs');

// 2. set port
const port = 3000;

// 3. set middleware
app.use(bodyParser.urlencoded({ extended: true }));

// 4. set router
app.get('/comments', (req, res) => {
    res.sendFile(path.join(__dirname, 'comments.html'));
});

app.post('/comments', (req, res) => {
    const comment = req.body.comment;
    const date = req.body.date;
    const ip = req.body.ip;
    const file = path.join(__dirname, 'comments.txt');

    fs.appendFile(file, `[${date}] ${ip} : ${comment}\n`, (err) => {
        if (err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
        res.redirect('/comments');
    });
});

// 5. start server
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});