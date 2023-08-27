import * as userController from '../controllers/user.controller';

const router = require('express').Router();

router.get('/all', async (req:any, res:any) => {
    if( req.isAuthenticated()) {
        const data = await userController.getAllUsers();
        res.status(200).json({
            status:200,
            message:'get all users',
            data: data
        });
    } else {
        res.status(401).json({
            status:401,
            message:'Unauthorized'
        });
    }
});

router.get('/:userId', async (req:any, res:any) => {
    if( req.isAuthenticated()) {
        const data = await userController.getUserById( req.params.userId );
        res.status(200).json({
            status:200,
            message:'get user by id',
            data: data
        });
    } else {
        res.status(401).json({
            status:401,
            message:'Unauthorized'
        });
    }
});

router.get('/view/:weekNum', async (req:any, res:any) => {
    if( req.isAuthenticated()) {
        const data = await userController.getUserView( req.params.weekNum );
        res.status(200).json({
            status:200,
            message:'get user view',
            data: data
        });
    } else {
        res.status(401).json({
            status:401,
            message:'Unauthorized'
        });
    }
});

module.exports = router;