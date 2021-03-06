const express = require('express');
const router = express.Router();
const db = require('../config/database');
const Sequelize = require('sequelize')
const Op = Sequelize.Op;

const guest = require("../models/Guest")

router.get("/", (req,res) => {
    guest.findAll()
    .then(guest => res.send(guest))
    .catch(err => console.log(err))
});

router.post("/find", (req,res) => {
    let { number } = req.body;
    guest.findAll({
        where: {
            number: number
        }
    })
    .then(guest => res.send(guest))
    .catch(err => console.log(err))
});

router.delete("/remove", (req,res) => {
    let { number } = req.body;
    guest.destroy({
        where: {
            number: number
        }
    })
    .then(() => res.sendStatus(200))
    .catch(err => console.log(err))
});

router.get("/men", (req,res) => {
    guest.findAll({
        where: {
            gender: "M"
        }
    })
    .then(guest => res.send(guest))
    .catch(err => console.log(err))
});

router.get("/women", (req,res) => {
    guest.findAll({
        where: {
            gender: "F"
        }
    })
    .then(guest => res.send(guest))
    .catch(err => console.log(err))
});

router.get("/families", (req,res) => {
    guest.findAll({
        where: {
            dependents: {
                [Op.gt]: 0
            }
        }
    })
    .then(guest => res.send(guest))
    .catch(err => console.log(err))
});

router.post("/", (req,res) => {
   let { number, gender, dependents } = req.body;

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