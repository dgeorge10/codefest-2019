const express = require('express');
const router = express.Router();
const db = require('../config/database');
const sequelize = require("sequelize")
const path = require("path");
const food = require("../models/Food")

router.get("/getCurrentDay", (req,res) => {
    var days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    var d = new Date();
    var day = days[d.getDay()];
    db.query("SELECT name,address," + day + " from shelter.Food where (" + day + "!= '')", { type: sequelize.QueryTypes.SELECT })
    .then(food => {
        res.send(food)
    })
    .catch(err => console.log(err))
});

router.get("/all", (req,res) => {
    food.findAll({})
    .then(food => res.send(food))
    .catch(err => console.log(err))
})

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
            name:foodName, address:foodAddress, city:foodCity, state:foodState, zip:foodZip, snap:foodSnap, fmnp:foodFMNP, monday:mondayTime, tuesday:tuesdayTime, wednesday:wednesdayTime, thursday:thursdayTime, friday:fridayTime, saturday:saturdayTime, sunday:sundayTime
        })
        newfood.save()
        .then(() => {
            // calendar.addEvent(newShelter.dataValues);
            res.sendFile(path.join(__dirname, "../public/index.html"))
        })
        .catch((err) => console.log(err))
    }
});
function concatTime(start, end){
    if(start!="" && end!=""){
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
