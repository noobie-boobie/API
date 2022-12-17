//This file contains the schema for all the offers

const mongoose = require('mongoose');
 
const offerSchema = new mongoose.Schema({
    "investor": {
        type: String,
        required: true,
        minlength: 1,
        trim: true 
    },
    "amount": {
        type: Number,
        required: true,
    },
    "equity": {
        type: Number,
        required: true,
        min: 0,
        max: 100
    },
    "comment": {
        type: String,
        required: true,
        minlength: 1,
        trim: true 
    }
})
 
const Offer = mongoose.model('Offer', offerSchema);
 
module.exports = {
    Offer,
    offerSchema
}