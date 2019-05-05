const express = require('express');
const router = express.Router();
const db = require('../config/database');
const path = require("path");
const user = require("../models/User")
const shelter = require("../models/Shelter")
const bcrypt = require("bcrypt")

router.get("/", (req,res) => {
    user.findAll()
        .then(users => res.send(users))
        .catch(err => console.log(err))
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
            if(user) {
            bcrypt.compare(password, user.dataValues.password, (err, result)=>{  
                if( result ) {
                    req.session.loggedin = true;
                    res.redirect("./dashboard")
                } else {
                    res.send("error logging in")
                }
            })
            } else {
                res.send("no user with that email")
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
        bcrypt.hash(password, 10/* salt */, (err, hash) =>{
        shelter.findOne({
            where: {
                name: shelterName
            }
        })
        .then(shelter => {
            const newUser = user.build({
                username,
                password: hash,
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
        })
    }
})

router.get("/dashboard", (req,res) => {
    if(req.session.loggedin){
        res.sendFile(path.join(__dirname, "../public/input_shelter.html"))
    } else {
        res.send("not logged in")
    }

})

module.exports = router;