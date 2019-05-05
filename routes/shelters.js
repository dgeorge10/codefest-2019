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
            name:shelterName, address:shelterAddress, city:shelterCity, state:shelterState, zip:shelterZip, gender:shelterType, beds:shelterBed, ages_served:shelterAges, registration:shelterRegistration, mondayTime, tuesdayTime, wednesdayTime, thursdayTime, fridayTime, saturdayTime, sundayTime
        })
        newShelter.save()
        .then(() => res.send("shelter saved"))
        .catch((err) => console.log(err))
    }
});

function concatTime(start, end){
    if(!start && !end){
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