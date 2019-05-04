const Sequelize = require('sequelize');
const db = require('../config/database');

//model for a user
const Shelter = db.define('Shelter', {
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
    gender: {
        type: Sequelize.STRING
    },
    day: {
        type: Sequelize.STRING
    },
    timein: {
        type: Sequelize.STRING
    },
    timeout: {
        type: Sequelize.STRING
    },
    beds: {
        type: Sequelize.STRING
    },
    ages_served: {
        type: Sequelize.STRING
    },
    registration: {
        type: Sequelize.STRING
    }

})

module.exports = Shelter;
