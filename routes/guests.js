const express = require('express');
const router = express.Router();
const db = require('../config/database');
const Op = Sequelize.Op;

const guest = require("../models/Guest")

router.get("/", (req,res) => {
    guest.findAll()
    .then(guest => res.send(guest))
    .catch(err => console.log(err))
});

router.get("/:number", (req,res) => {
    guest.findAll({
        where: {
            number: req.params["number"]
        }
    })
    .then(guest => res.send(guest))
    .catch(err => console.log(err))
});

router.get("/men", (req,res) => {
    guest.findAll({
        where: {
            gender: "male"
        }
    })
    .then(guest => res.send(guest))
    .catch(err => console.log(err))
});

router.get("/women", (req,res) => {
    guest.findAll({
        where: {
            gender: "female"
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
  
})

module.exports = router;