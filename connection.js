// Do not change this file
require('dotenv').config();
const MongoClient = require('mongodb');


let db = MongoClient.connect(process.env.DB, {useNewUrlParser: true, useUnifiedTopology: true});

module.exports = db;