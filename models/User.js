const Sequelize = require('sequelize');
const db = require('../config/database')

//model for a user
const User = db.define('User', {
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true
    },
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
