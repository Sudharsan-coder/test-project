import { error } from "console";

const table = require('../models');

const Users = table.Users;

const createUser = async (userName:string, googleId:string, userImg:string, userEmail:string) => {
    if(!userName || !googleId || !userImg || !userEmail){
        return error({
            status: 400,
            message: 'All Fields Are Required'
        });
    }
    const user = {
        userName: userName,
        googleId: googleId,
        userImg: userImg,
        userEmail: userEmail,
    }
    return await Users.create(user)
}

const findUser = async (googleId:string) => {
    if(!googleId){
        return error({
            status: 400,
            message: 'User Not Found'
        });
    }
    return await Users.findAll({
        where: {
            googleId: googleId
        }
    })
}

const userController = {
    createUser,
    findUser
}

export default userController;