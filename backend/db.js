//  We are importing the mongoose here
const mongoose = require('mongoose');

// We are providing the mongo String to the const mongoURI
const mongoURI = "mongodb://127.0.0.1/inotebook";
// Connecting to the database
const connectToMongo = ()=> {
    mongoose.connect(mongoURI);
}

module.exports = connectToMongo;
