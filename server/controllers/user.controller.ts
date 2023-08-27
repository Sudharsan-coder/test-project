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
    console.log('userCreated');
    
    const newUser = await Users.create(user);

    return newUser;
}

const getUserById = async ( userId: number ) => {
    const result = await Users.findOne({
        where: {id: userId}
    });
    console.log(JSON.stringify(result, null, 2));
    return result;
}

const getUserByGoogleId = async ( googleId: string ) => {
    const result = await Users.findOne({
        where: {googleId: googleId}
    });
    console.log(JSON.stringify(result, null, 2));
    return result;
};

const getAllUsers = async () => {
    const result = await Users.findAll();
    console.log(JSON.stringify(result, null, 2));
    return result;
}

const updateUser = async ( userId: number, userName: string, userImg: string, userEmail: string ) => {
    const result = await Users.update({
        userName: userName,
        userImg: userImg,
        userEmail: userEmail,
    }, {
        where: {id: userId}
    });
    console.log(JSON.stringify(result, null, 2));
    return result;
}

export { getAllUsers, createUser, getUserById, getUserByGoogleId, updateUser };


























































// const getAllUsers = async (weekNum:number) => {
//     const result = await Users.findOrCreate({
//         include: [{
//             model: table.Ratings,
//             as: 'ratings',
//             where: {weekNum: weekNum}
//         },
//         {
//             model: table.Skills,
//             as: 'skills'
//         }
//     ]
//     })
//     return result
// }

// const getAllUsers = async (weekNum:number) => {

//     const userIds = await table.Ratings.findAll({
//         attributes: ['userId'],
//     })

//     const userIdsArray = userIds.map((userId:any) => userId.userId)

//     // get all userIds
//     const alluserid = await table.Users.findAll({});
//     // findOrCreate ratings for all userIds where weekNum = weekNum
//     const allUserRatings = await table.Ratings.findOrCreate({
//         where: { 
//             weekNum: 35,
//             userId: alluserid
//         },
//         defaults: {
//             weekNum: 35,
//             teamPlay: 0,
//             attitude: 0,
//             technicalExpertise: 0,
//             codingSkills: 0,
//             overAllScore: 0,
//         }
//     });

//     // const result = await Users.findAll({
//     //     include: [{
//     //         model: table.Ratings,
//     //         as: 'ratings',
//     //         where: {weekNum: 35}
//     //     },
//     //     {
//     //         model: table.Skills,
//     //         as: 'skills'
//     //     }],
//     //     where: {id: userIdsArray}
//     // })

//     console.log(JSON.stringify(allUserRatings, null, 2));
    
//     return allUserRatings;
// }