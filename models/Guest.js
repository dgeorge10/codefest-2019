const Sequelize = require('sequelize');
const db = require('../config/database');

//model for a user
const Guest = db.define('guest', {
    number:{
        type: Sequelize.STRING
    },
    gender:{
        type: Sequelize.STRING
    },
    dependents: {
        type: Sequelize.INTEGER
    }
})

module.exports = Guest;
