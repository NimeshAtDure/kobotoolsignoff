const express = require('express');

const router = express.Router();

const bookController = require('../controllers/bookcontroller');

router.get('/', async (req, res) => {
    try {
        
        res.statusCode ="200";

        return res.json({message: "server is running"});
    } catch (error) {
        next (error);
    }
  });
// router.post('/users/add', bookController.addUser);
// router.get('/users/getuser', bookController.getUserById);
// router.put('/users/updateuser', bookController.updateUserById);
// router.delete('/users/deleteuser', bookController.deleteUserById);
router.get('/users', bookController.getAllUser);
router.post("/generateotp",bookController.generateOTP)
router.post("/login",bookController.login)
router.post("/getdata",bookController.getData)

module.exports = router;

