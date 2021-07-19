require('dotenv').config();
const { MongoClient } = require('mongodb');

async function main(callback) {
    const URI = process.env.MONGO_URI;
    const client = new MongoClient(URI, { useNewUrlParser: true, useUnifiedTopology: true});

    try {
        // Connect to MONGO cluster
        await client.connect();

        // Make the appropriate DB callback
        await callback(client);
    } catch (e) {
        // Catch any errors
        console.log(e);
        throw new Error("Unable to connect to database");
    }
}

module.exports = main;