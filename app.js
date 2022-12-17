const express = require('express');
const mongoose = require('./db/mongoose');
const bodyParser = require('body-parser');
const { Offer, Pitch } = require("./db/model/index");

const app = express();
const PORT = 8081;

app.use(bodyParser.json());

//Formats the offers according to the given format
let remap = (offers) => {

    offers = offers.map( obj => {
        return{
            "id": obj._id,
            "investor": obj.investor,
            "amount": obj.amount,
            "equity": obj.equity,
            "comment": obj.comment
        }
    })

    return offers.reverse();
}

// ROUTE HANDLERS

/**
 * GET /pitches
 * Purpose: Gets all the pitches
 */

app.get("/pitches", (req, res) => {

    Pitch.find().then( (pitchDoc) => {
        pitchDoc = pitchDoc.map(
            obj => {
                return {
                    "id": obj._id,
                    "entrepreneur": obj.entrepreneur,
                    "pitchTitle": obj.pitchTitle,
                    "pitchIdea": obj.pitchIdea,
                    "askAmount": obj.askAmount,
                    "equity": obj.equity,
                    "offers": remap(obj.offers)
                }
            });
        res.status(200).send(pitchDoc.reverse());
    })
});

/**
 * GET /pitches/:pitchId
 * Purpose: Get a specific pitch
 */
app.get("/pitches/:pitchId", (req, res) => {

    Pitch.findOne({ 
        '_id' : req.params.pitchId 
    }, (err, pitch) => {
        if(err || Object.keys(pitch).length == 0){
           res.sendStatus(404);
        }
        else{
            pitchDoc = {
                "id": pitch._id,
                "entrepreneur": pitch.entrepreneur,
                "pitchTitle": pitch.pitchTitle,
                "pitchIdea": pitch.pitchIdea,
                "askAmount": pitch.askAmount,
                "equity": pitch.equity, 
                "offers": remap(pitch.offers)

            }
            res.status(200).send(pitchDoc);
        }
    });
});

/**
 * POST /pitches
 * Purpose: Create a new pitch
 */
app.post("/pitches", (req, res) => {

    let pitch = req.body;
    let newPitch = new Pitch(pitch);

    if(Object.keys(pitch).length == 0){
        res.sendStatus(400);
    }
    else{
            newPitch.save((err, pitchDoc) => {
                if(err){
                    res.sendStatus(400);
                }
                else{
                    res.status(201).send({"id": pitchDoc._id});
                }
            })
    }
});


/**
 * POST /pitches/:pitchId/makeOffer
 * Purpose: Create a new offer and add it to a specific pitch
 */
app.post("/pitches/:pitchId/makeOffer", (req, res) => {

    let offer = req.body;
    let newOffer = new Offer(offer);
    newOffer.save((err, offer) => {
        if(err || Object.keys(offer).length == 0){
            res.sendStatus(400);
        }
        else{
            Pitch.findOneAndUpdate({
                "_id": req.params.pitchId
            }, { $push: { "offers": newOffer }}, (err, pitch) => {
                if(err){
                    res.sendStatus(404);
                }
                else{
                    res.status(201).send({"id": newOffer._id});
                }
            });
        }
    });
});

/**
 * END OF ROUTE HANDLERS
 */

app.listen(PORT, ()=>{
    console.log("localhost:8081");
})