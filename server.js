'use strict'

const express =  require('express');

require('dotenv').config();

let app = express();

app.use('/public', express.static(process.cwd() + '/public'));

// Load Index.html file
app.get('/', (req, res) => {
    res.sendFile(process.cwd() + '/views/index.html');
});

app.listen(process.env.PORT || 3030, () => {
    console.log("Listening on port " + process.env.PORT);
});
