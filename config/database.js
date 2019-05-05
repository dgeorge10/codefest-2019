
const Sequelize = require('sequelize');
module.exports = new Sequelize('shelter', 'root', 'phillycode1', {
	host:'35.193.34.182',
    dialect: 'mysql',
    operatorsAliases: false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }

})

// require('dotenv').config()
// const Sequelize = require('sequelize');
// module.exports = new Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_USER, process.env.DATABASE_PASS, {
// 	host:process.env.DATABASE_HOST,
//     dialect: 'mysql',
//     operatorsAliases: false,
//     pool: {
//         max: 5,
//         min: 0,
//         acquire: 30000,
//         idle: 10000
//     }

// })