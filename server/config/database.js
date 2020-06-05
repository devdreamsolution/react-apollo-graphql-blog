const mongoose = require('mongoose');

const DB_URI = 'mongodb://localhost:27017/graphql-app';
// const DB_URI = 'mongodb://u1jkb13v2sjxlzpzorlh:MJawnEMr8tds5sr8QpYe@bvzf4mdm7hhda5y-mongodb.services.clever-cloud.com:27017/bvzf4mdm7hhda5y';
// const DB_URI = 'mongodb+srv://admin-1:Xn4X8vchcTHKcjFR@cluster0-qk6kb.gcp.mongodb.net/test?retryWrites=true&w=majority';
// const DB_URI = 'mongodb://38eb6ea53708fa447f4ba04335a1d85f:'+encodeURIComponent('123456789')+'@mongodb:27017/38eb6ea53708fa447f4ba04335a1d85f';

mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true });

mongoose.connection.once('open', () => console.log('Connected to a MongoDB instance'));
mongoose.connection.on('error', error => console.error(error));

module.exports = mongoose;

// const MongoClient = require('mongodb').MongoClient;
// const uri = 'mongodb+srv://admin-1:Xn4X8vchcTHKcjFR@cluster0-qk6kb.gcp.mongodb.net/test?retryWrites=true&w=majority';
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect(err => {
//   const collection = client.db("graphql-app").collection("posts");
//   // perform actions on the collection object
//   console.log('Connected to a MongoDB instance');
//   client.close();
// });
// module.exports = client;