'use strict'

const express =  require('express');
const bodyParser = require('body-parser');
const expect = require('chai').expect;
const cors = require('cors');
require('dotenv').config();

const connection = require('mongoose').connection;

const apiRoute = require('./routes/api.js');
const fccTestingRoutes = require('./routes/fcctesting.js');
const runner = require('./test-runner.js');
const fcctesting = require('./routes/fcctesting.js');

let app = express();

app.use('/public', express.static(process.cwd() + '/public'));

app.use(cors({origin: '*'}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.route('/:project/').get((req, res) => {
    res.sendFile(process.cwd() + '/views/issue.html');
});

// Load Index.html file
app.route('/').get((req, res) => {
    res.sendFile(process.cwd() + '/views/index.html');
});

fccTestingRoutes(app);

apiRoute(app);

app.listen(process.env.PORT || 3030, () => {
    console.log("Listening on port " + process.env.PORT);
    if (process.env.NODE_ENV==="test") {
        console.log('Running tests...');
        setTimeout(() => {
            try {
                runner.run();
            } catch (e) {
                let error = e;
                console.log('Tests are not valid...');
                console.log(error);
            }
        }, 3500);
    }
});

module.exports = app;