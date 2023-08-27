import * as skillController from '../controllers/skills.controller';
const router = require('express').Router();

router.get('/:userId', async (req:any, res:any) => {
    if( req.isAuthenticated()) {
        const data = await skillController.getSkillByUserId( req.params.userId );
        res.status(200).json({
            status:200,
            message:'get skill by user id',
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
        const data = await skillController.updateSkillByUserId( req.body.skills, req.body.userId );
        res.status(200).json({
            status:200,
            message:'update skill by user id',
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