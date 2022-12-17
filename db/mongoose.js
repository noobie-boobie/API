// This file will handle connection logic to the MongoDB database

const mongoose = require('mongoose');
 
mongoose.connect("mongodb://localhost:27017/XharkTankFinal", () => {
    console.log("Connected to Mongo");
});
 
module.exports = {
    mongoose
};