const express = require('express');
const router = express.Router();
const db = require('../config/database');

const shelter = require("../models/Shelter")

router.get("/", (req,res) => {
    shelter.findAll()
    .then(shelters => res.send(shelters))
    .catch(err => console.log(err))
});

router.post("/", (req,res) => {
    let { shelterName, shelterAddress, shelterCity, shelterState, shelterZip, shelterAges, shelterBed, shelterType, mondayTimeIn, mondayTimeOut, tuesdayTimeIn, tuesdayTimeOut, wednesdayTimeIn, wednesdayTimeOut, thursdayTimeIn, thursdayTimeOut, fridayTimeIn, fridayTimeOut, saturdayTimeIn, saturdayTimeOut, sundayTimeIn } = req.body;
    console.log(req.body);
    if (!shelterName || !shelterAddress || !shelterCity || !shelterState || !shelterZip || !shelterAges || !shelterBed || !shelterType) {
        res.sendStatus(400);
    } else {
        const newShelter = shelter.build({
            name, address, city, state, zip, gender, day, 
            timein, timeout, beds, ages_served, registration
        })
        newShelter.save()
        .then(() => res.send("shelter saved"))
        .catch((err) => console.log(err))
    }
});

module.exports = router;