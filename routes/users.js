const express = require('express');
const router = express.Router();
const db = require('../config/database');
const path = require("path");
const user = require("../models/User")
const shelter = require("../models/Shelter")

router.get("/", (req,res) => {
    // user.findAll()
    // .then(users => res.send(users))
    // .catch(err => console.log(err))
    res.sendStatus(0)
});

router.post("/login", (req,res) => {
    let { username, password } = req.body;

    if(!username || !password ) {
        res.sendStatus(400);
    } else {
        user.findOne({
            where: {
                username
            }
        })
        .then(user => {
            console.log(password, user)
            if(password == user.dataValues.password) {
                req.session.loggedin = true;
                res.redirect("./dashboard")
            } else {
                res.send("error logging in")
            }
        })
        .catch(err => console.log(err))
    }
})

router.post("/register", (req,res) => {
    let { username, password, shelterName } = req.body;
    if (!username || !password) {
        res.sendStatus(400);
    } else {
        let shelterId;
        shelter.findOne({
            where: {
                name: shelterName
            }
        })
        .then(shelter => {
            const newUser = user.build({
                username,
                password,
                shelterId: shelter.id
            })
            newUser.save()
            .then(() => {
                req.session.loggedin = true;
                res.redirect("./dashboard")
            })
            .catch((err) => console.log(err))
        })
        .catch(err => console.log(err))
    }
})


router.get("/dashboard", (req,res) => {
    if(req.session.loggedin){
        res.sendFile(path.join(__dirname, "../public/dashboard.html"))
    } else {
        res.send("not logged in")
    }

})

module.exports = router;