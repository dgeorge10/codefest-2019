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
        let mondayTime = mondayTimeIn+"-"mondayTimeOut;
        let tuesdayTime = tuesdayTimeIn+"-"tuesdayTimeOut;
        let wednesdayTime = wednesdayTimeIn+"-"wednesdayTimeOut;
        let thursdayTime = thursdayTimeIn+"-"thursdayTimeOut;
        let fridayTime = fridayTimeIn+"-"fridayTimeOut;
        let saturdayTime = saturdayTimeIn+"-"saturdayTimeOut;
        let sundayTime = sundayTimeIn+"-"sundayTimeOut;
        const newfood = food.build({
            name:foodName, address:foodAddress, city:foodCity, state:foodState, zip:foodZip, snap:foodSnap, fmnp:foodFMNP, mondayTime, tuesdayTime, wednesdayTime, thursdayTime, fridayTime, saturdayTime, sundayTime
        })
        newfood.save()
        .then(() => res.send("food saved"))
        .catch((err) => console.log(err))
    }
});

module.exports = router;