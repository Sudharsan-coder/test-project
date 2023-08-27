import * as routerController from '../controllers/ratings.controller';
const router = require('express').Router();

router.get('/:userId/:weekNum', async (req:any, res:any) => {
    if( req.isAuthenticated()) {
        const data = await routerController.getRatingByUserIdAndWeekNum( req.params.userId, req.params.weekNum );
        res.status(200).json({
            status:200,
            message:'get rating by user id and week num',
            data: data
        });
    } else {
        res.status(401).json({
            status:401,
            message:'Unauthorized'
        });
    }
});

router.post('/create', async (req:any, res:any) => {
    if( req.isAuthenticated()) {
        const data = await routerController.createRating( req.body.teamPlay, req.body.attitude, req.body.technicalExpertise, req.body.codingSkills, req.body.overAllScore, req.body.userId );
        res.status(200).json({
            status:200,
            message:'create rating',
            data: data
        });
    } else {
        res.status(401).json({
            status:401,
            message:'Unauthorized'
        });
    }
});

router.post('/update', async (req:any, res:any) => {
    if( req.isAuthenticated()) {
        const data = await routerController.updateRating( req.body.teamPlay, req.body.attitude, req.body.technicalExpertise, req.body.codingSkills, req.body.overAllScore, req.body.userId, req.body.weekNum );
        res.status(200).json({
            status:200,
            message:'update rating by user id and week num',
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