//This file contains the schema for the pitches

const mongoose = require('mongoose');
const { offerSchema } = require('./offer.model');

const pitchSchema = new mongoose.Schema({
    "entrepreneur": {
        type: String,
        required: true,
        minlength: 1,
        trim: true 
    },
    "pitchTitle": {
        type: String,
        required: true,
        minlength: 1,
        trim: true 
    },
    "pitchIdea": {
        type: String,
        required: true,
        minlength: 1,
        trim: true 
    },
    "askAmount": {
        type: Number,
        required: true,
    },
    "equity": {
        type: Number,
        required: true,
        min: 0,
        max: 100
    },
    "offers": {
        type: [offerSchema],
        required: true,
    }
})

const Pitch = mongoose.model('Pitch', pitchSchema);

module.exports = {
    Pitch
}