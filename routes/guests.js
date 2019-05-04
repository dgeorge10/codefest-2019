const express = require('express');
const router = express.Router();
const db = require('../config/database');

const guest = require("../models/Guest")

router.get("/", (req,res) => {
    guest.findAll()
    .then(guest => res.send(guest))
    .catch(err => console.log(err))
});

router.post("/", (req,res) => {
  
})

module.exports = router;