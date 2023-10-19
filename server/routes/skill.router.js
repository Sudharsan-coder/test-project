const skillController =require( '../controllers/skills.controller');
const router = require('express').Router();
const util=require("../util/index")

router.post('/create',async(req,res)=>{
    const data=await skillController.createSkill(req.body.skills,req.body.phase,req.body.userId,util.getWeekNumber())
    res.status(200).json({
        status:200,
        message:"add skills by user id",
        data:data,
    })
})
router.post('/update', async (req, res) => {
        const data = await skillController.updateSkillByUserId( req.body.skills, req.body.phase , req.body.userId,req.body.weekNum,year );
        res.status(200).json({
            status:200,
            message:'update skill by user id',
            data: data
        });
});

router.get('/:userId', async (req, res) => {
        const data = await skillController.getSkillByUserId( req.params.userId );
        res.status(200).json({
            status:200,
            message:'get skill by user id',
            data: data
        });
});

module.exports = router;