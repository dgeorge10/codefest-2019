const express = require('express');
const router = express.Router();
const db = require('../config/database');
const calendar = require("../public/cal/index");
const shelter = require("../models/Shelter");
const path = require("path");
const sequelize = require("sequelize")


router.get("/getCurrentDay", (req,res) => {
    var days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    var d = new Date();
    var day = days[d.getDay()];
    db.query("SELECT name,address," + day + " from shelter.Shelters where (" + day + "!='')", { type: sequelize.QueryTypes.SELECT })
    .then((shelters) => {
        res.send(shelters)
    })
    .catch(err => console.log(err))
});

router.get("/all", (req,res) => {
    shelter.findAll({})
    .then(food => res.send(food))
    .catch(err => console.log(err))
})

router.post("/", (req,res) => {
    let { shelterName, shelterAddress, shelterCity, shelterState, shelterZip, shelterAges, shelterBed, shelterType, shelterRegistration, mondayTimeIn, mondayTimeOut, tuesdayTimeIn, tuesdayTimeOut, wednesdayTimeIn, wednesdayTimeOut, thursdayTimeIn, thursdayTimeOut, fridayTimeIn, fridayTimeOut, saturdayTimeIn, saturdayTimeOut, sundayTimeIn, sundayTimeOut } = req.body;
    console.log(req.body);
    if (!shelterName || !shelterAddress || !shelterCity || !shelterState || !shelterZip || !shelterAges || !shelterBed || !shelterType) {
        res.sendStatus(400);
    } else {
        let mondayTime = concatTime(mondayTimeIn,mondayTimeOut);
        let tuesdayTime = concatTime(tuesdayTimeIn,tuesdayTimeOut);
        let wednesdayTime = concatTime(wednesdayTimeIn,wednesdayTimeOut);
        let thursdayTime = concatTime(thursdayTimeIn,thursdayTimeOut);
        let fridayTime = concatTime(fridayTimeIn,fridayTimeOut);
        let saturdayTime = concatTime(saturdayTimeIn,saturdayTimeOut);
        let sundayTime = concatTime(sundayTimeIn,sundayTimeOut);
        const newShelter = shelter.build({
            name:shelterName, address:shelterAddress, city:shelterCity, state:shelterState, zip:shelterZip, gender:shelterType, beds:shelterBed, ages_served:shelterAges, registration:shelterRegistration, monday:mondayTime, tuesday:tuesdayTime, wednesday:wednesdayTime, thursday:thursdayTime, friday:fridayTime, saturday:saturdayTime, sunday:sundayTime
        })
        newShelter.save()
        .then(() => {
           // calendar.addEvent(newShelter.dataValues);
            res.sendFile(path.join(__dirname, "../public/cal/index.html"))
        })
        .catch((err) => console.log(err))
    }
});

function concatTime(start, end){
    if(start!="" && end!=""){
        return start+"-"+end;
    }else{
        return ""
    }
}

router.get("/:id", (req,res) => {
    let { id } = req.params;
    shelter.findOne({
        where:{
            id
        }
    })
    .then(row => res.send(row))
    .catch(err => console.log(err))
});

module.exports = router;