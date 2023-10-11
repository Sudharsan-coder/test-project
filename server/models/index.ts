import dbConfig from "../config/db.config";
import usersModel from "./users.model";
import ratingsModel from "./ratings.model";
import skillsModel from "./skills.model";

const Sequelize = require('sequelize');

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: 0,

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

export { Sequelize, sequelize, Users, Ratings, Skills};