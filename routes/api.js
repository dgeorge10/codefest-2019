const express = require('express');
const router = express.Router();
const db = require('../config/database');

const shelter = require("../models/Shelter")

router.get("/", (req,res) => {
    res.send('test')
})

router.get("/shelters", (req,res) => {
    shelter.findAll()
    .then(shelters => res.send(shelters))
    .catch(err => console.log(err))
});

module.exports = router;
