require('dotenv').config();
//  We are importing the mongoose here
const mongoose = require('mongoose');

// We are providing the mongo String to the const mongoURI
const mongoURI = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}/${process.env.MONGO_DBNAME}`;
// Connecting to the database
const connectToMongo = ()=> {
    mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
}

module.exports =  connectToMongo;
