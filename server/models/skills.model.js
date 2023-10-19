const skillsModel = (sequelize, Sequelize) => {
    const Skill = sequelize.define("Skill", {
        id:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        skills:{
            type: Sequelize.STRING,
            allowNull: true
        },
        phase:{
            type: Sequelize.STRING,
            defaultValue: "Intern"
        },
        weekNum:{
            type: Sequelize.INTEGER,
            defaultValue: 0,
        },
        createdAt:{
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.fn('NOW'),
        },
        updatedAt:{
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.fn('NOW'),
        },
        year:{
            type: Sequelize.INTEGER,
            defaultValue: new Date().getFullYear,
        },
    },{
        tableName: "skills"
    });
    return Skill;
}

module.exports =  skillsModel;