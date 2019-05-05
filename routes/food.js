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
    let { foodName, foodAddress, foodCity, foodState, foodZip, foodSnap, foodBucks, foodFMNP, mondayTimeIn, mondayTimeOut, tuesdayTimeIn, tuesdayTimeOut, wednesdayTimeIn, wednesdayTimeOut, thursdayTimeIn, thursdayTimeOut, fridayTimeIn, fridayTimeOut, saturdayTimeIn, saturdayTimeOut, sundayTimeIn, sundayTimeOut } = req.body;
    console.log(req.body);
    if (!foodName || !foodAddress || !foodCity || !foodState || !foodZip || !foodSnap || !foodBucks || !foodFMNP) {
        res.sendStatus(400);
    } else {
        let mondayTime = concatTime(mondayTimeIn,mondayTimeOut);
        let tuesdayTime = concatTime(tuesdayTimeIn,tuesdayTimeOut);
        let wednesdayTime = concatTime(wednesdayTimeIn,wednesdayTimeOut);
        let thursdayTime = concatTime(thursdayTimeIn,thursdayTimeOut);
        let fridayTime = concatTime(fridayTimeIn,fridayTimeOut);
        let saturdayTime = concatTime(saturdayTimeIn,saturdayTimeOut);
        let sundayTime = concatTime(sundayTimeIn,sundayTimeOut);
        const newfood = food.build({
            name:foodName, address:foodAddress, city:foodCity, state:foodState, zip:foodZip, snap:foodSnap, fmnp:foodFMNP, mondayTime, tuesdayTime, wednesdayTime, thursdayTime, fridayTime, saturdayTime, sundayTime
        })
        newfood.save()
        .then(() => res.send("food saved"))
        .catch((err) => console.log(err))
    }
});
function concatTime(start, end){
    if(!start && !end){
        return start+"-"+end;
    } else {
        return ""
    }
}

router.get("/:id", (req,res) => {
    let { id } = req.params;

    food.findOne({
        where:{
            id
        }
    })
    .then(row => res.send(row))
    .catch(err => console.log(err))
});

module.exports = router;
