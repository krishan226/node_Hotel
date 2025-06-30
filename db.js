const mongoose = require('mongoose');
require('dotenv').config();

// Define the MongoDB connection URL
const mongoURL = process.env.Local_URL // Replace 'mydatabase' with your database name
// const mongoURL = process.env.MONGODB_URL // Replace 'mydatabase' with your database name

// Set a MongoDB connection
// this parameters are deprecated you can directly passed the URL//
// mongoose.connect(mongoURL, {
//     // useNewUrlParser: true,
//     // useUnifiedTopology: true,
//     // useCreateIndex: true,
//     // useFindAndModify: true
// })
mongoose.connect(mongoURL);

// Get a default connection
// Mongoose maintains a default connection object representing the mongoDB connection
const db = mongoose.connection;

// Define event listeners for database connection changes
db.on('connection', () => {
    console.log('connected to MongoDB server');
});

db.on('error', err => {
   console.log('MongoDb connection error: ', err);
});

db.on('disconnected', () => {
    console.log('MongoDb connection disconnected');
});


//Export the database connection
module.exports = db;