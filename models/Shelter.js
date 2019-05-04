const Sequelize = require('sequelize');
const db = require('../config/database');

//model for a user
const Shelter = db.define('Shelters', {
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
    gender: {
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

module.exports = Shelter;
