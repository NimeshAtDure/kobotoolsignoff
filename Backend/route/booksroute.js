const express = require('express');

const router = express.Router();

const bookController = require('../controllers/bookcontroller');

router.post('/users/add', bookController.addUser);
router.get('/users', bookController.getAllUser);
router.get('/users/getuser', bookController.getUserById);
router.put('/users/updateuser', bookController.updateUserById);
router.delete('/users/deleteuser', bookController.deleteUserById);
router.post("/generateotp",bookController.generateOTP)
router.post("/login",bookController.login)
router.get("/getdata",bookController.getData)
module.exports = router;

