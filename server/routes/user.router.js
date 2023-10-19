const userController =require( '../controllers/user.controller');

const router = require('express').Router();

router.get('/all', async (req, res) => {
        const data = await userController.getAllUsers();
        res.status(200).json({
            status:200,
            message:'get all users',
            data: data
        });
});


router.get('/view/:weekNum', async (req, res) => {
        console.log("view  :")
        console.log(req.query)
        const data = await userController.getUserView( Number(req.params.weekNum),Number(req.query.rowsPerPage),Number(req.query.page)-1,Number(req.query.year));
        console.log(data)
        res.status(200).json({
            status:200,
            message:'get user view',
            data: data
        });
});

router.get('/:userName', async (req, res) => {
        const data = await userController.getUserByName( req.params.userName );
        res.status(200).json({
            status:200,
            message:'get user by id',
            data: data
        });
});

module.exports = router;