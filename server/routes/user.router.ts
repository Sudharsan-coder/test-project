const userController = require('../controllers/user.controller');

const router = require('express').Router();

// router.post('/create', function (req:any, res:any) {
//     userController.createUser
// });
// router.get('/find', function (req:any, res:any) {
//     userController.findById
// });
router.get('/all', function (req:any, res:any) {
    if( req.isAuthenticated()) {
        res.status(200).json({
            status:200,
            message:'get all users',
            data: userController.getAllUsers()
        });
    } else {
        res.status(401).json({
            status:401,
            message:'Unauthorized'
        });
    }
});


module.exports = router;