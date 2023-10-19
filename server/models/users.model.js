const usersModel = (sequelize, Sequelize) => {
    const User = sequelize.define("User", {
        id:{
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        userName:{
            type: Sequelize.STRING,
            allowNull: false,
        },
        userEmail:{
            type: Sequelize.STRING,
            allowNull: false,
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
        tableName: 'users',
    });
    return User;
}

module.exports = usersModel;
