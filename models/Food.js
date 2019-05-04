const Sequelize = require('sequelize');
const db = require('../config/database');

//model for a user
const Shelter = db.define('Food', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING
    },
    address: {
        type: Sequelize.STRING
    },
    city: {
        type: Sequelize.STRING
    },
    state: {
        type: Sequelize.STRING
    },
    zip: {
        type: Sequelize.STRING
    },
    snap: {
        type: Sequelize.STRING
    },
    fmnp: {
        type: Sequelize.STRING
    },
    bucks: {
        type: Sequelize.STRING
    },
    mondayIn: {
        type: Sequelize.STRING
    },
    mondayOut: {
        type: Sequelize.STRING
    },
    tuesdayIn: {
        type: Sequelize.STRING
    },
    tuesdayOut: {
        type: Sequelize.STRING
    },
    wednesdayIn: {
        type: Sequelize.STRING
    },
    wednesdayOut: {
        type: Sequelize.STRING
    },
    thursdayIn: {
        type: Sequelize.STRING
    },
    thursdayOut: {
        type: Sequelize.STRING
    },
    fridayIn: {
        type: Sequelize.STRING
    },
    fridayOut: {
        type: Sequelize.STRING
    },
    saturdayIn: {
        type: Sequelize.STRING
    },
    saturdayOut: {
        type: Sequelize.STRING
    },
    sundayIn: {
        type: Sequelize.STRING
    },
    sundayOut: {
        type: Sequelize.STRING
    }
})

module.exports = Food;
