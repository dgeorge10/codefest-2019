const Sequelize = require('sequelize');
const db = require('../config/database');

//model for a user
const Food = db.define('Food', {
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
    monday: {
        type: Sequelize.STRING
    },
    tuesday: {
        type: Sequelize.STRING
    },
    wednesday: {
        type: Sequelize.STRING
    },
    thursday: {
        type: Sequelize.STRING
    },
    friday: {
        type: Sequelize.STRING
    },
    saturday: {
        type: Sequelize.STRING
    },
    sunday: {
        type: Sequelize.STRING
    },
})

module.exports = Food;
