const dbConfig =require( "../config/db.config");
const usersModel =require( "./users.model");
const ratingsModel =require( "./ratings.model");
const skillsModel =require( "./skills.model");

const Sequelize = require('sequelize');

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: 0,
    dialectOptions: {
        decimalNumbers: true, // Enable this option to parse decimal numbers correctly
      },
    pool:{
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const Users = usersModel(sequelize, Sequelize);
const Ratings = ratingsModel(sequelize, Sequelize);
const Skills = skillsModel(sequelize, Sequelize);

Users.hasMany(Ratings,{
    foreignKey: 'userId',
    as: 'ratings'
});
Ratings.belongsTo(Users,{
    foreignKey: 'userId',
    as: 'user'
});

Users.hasOne(Skills,{
    foreignKey: 'userId',
    as: 'skills'
});
Skills.belongsTo(Users,{
    foreignKey: 'userId',
    as: 'user'
})

module.exports = { Sequelize, sequelize, Users, Ratings, Skills};