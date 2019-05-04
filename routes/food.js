const express = require('express');
const router = express.Router();
const db = require('../config/database');

const food = require("../models/Food")

router.get("/", (req,res) => {
    food.findAll()
    .then(food => res.send(food))
    .catch(err => console.log(err))
});

router.post("/", (req,res) => {
    let { foodName, foodAddress, foodCity, foodState, foodZip, foodSnap, foodBucks, foodFMNP, mondayTimeIn, mondayTimeOut, tuesdayTimeIn, tuesdayTimeOut, wednesdayTimeIn, wednesdayTimeOut, thursdayTimeIn, thursdayTimeOut, fridayTimeIn, fridayTimeOut, saturdayTimeIn, saturdayTimeOut, sundayTimeIn } = req.body;
    console.log(req.body);
    if (!foodName || !foodAddress || !foodCity || !foodState || !foodZip || !foodSnap || !foodBucks || !foodFMNP) {
        res.sendStatus(400);
    } else {
        const newfood = food.build({
            name, address, city, state, zip, gender, day, 
            timein, timeout, beds, ages_served, registration
        })
        newfood.save()
        .then(() => res.send("food saved"))
        .catch((err) => console.log(err))
    }
});

module.exports = router;