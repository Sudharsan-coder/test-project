const skillsModel = (sequelize: any, Sequelize: any) => {
    const Skill = sequelize.define("Skill", {
        id:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        skills:{
            type: Sequelize.JSON,
            allowNull: true
        },
        phase:{
            type: Sequelize.STRING,
            defaultValue: "Intern"
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
    },{
        tableName: "skills"
    });
    return Skill;
}

export default skillsModel;