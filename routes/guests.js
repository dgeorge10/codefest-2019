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
   let { number,  gender, dependents } = req.body;

   if(!number || !gender || !dependents ){
       res.send(400)
    }
    else {
        const newGuest = guest.build({
            number,
            gender,
            dependents
        });
        newGuest.save()
        .then(() => res.send("guest saved"))
        .catch((err) => console.log(err))
    }


})

module.exports = router;