const Sequelize = require('sequelize');
const db = require('../config/database')

//model for a user
const User = db.define('User', {
    username:{
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING
    }, 
    shelterId: {
        type: Sequelize.INTEGER
    }
})

module.exports = User;
