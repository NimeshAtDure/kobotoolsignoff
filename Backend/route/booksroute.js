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
router.post("/updatedata",bookController.updateData)
router.post("/statesignoff",bookController.stateSignoff)
router.post("/resposignoff",bookController.resppersonSignoff)
router.post("/thematicsignoff",bookController.thematicheadSignoff)
router.post("/m&esignoff",bookController.MNEheadSignoff)
router.post("/m&esignoffoi",bookController.MNEheadSignoffoi)
router.post("/cmtsignoff",bookController.CMTheadSignoff)
router.post("/cmtsignoffoi",bookController.CMTheadSignoffoi)
router.post("/stateheadSignOffcpap",bookController.stateheadSignOffcpap)
router.post("/thematicheadSignOffcpap",bookController.thematicheadSignOffcpap)
router.post("/mneSignOffcpap",bookController.mneSignOffcpap)
router.post("/stateheadSignOffrrf",bookController.stateheadSignOffrrf)
router.post("/thematicheadSignOffrrf",bookController.thematicheadSignOffrrf)
router.post("/mneSignOffrrf",bookController.mneSignOffrrf)
router.post("/uploadfile",bookController.uploadfile)
router.get("/getfile",bookController.getfile)

module.exports = router;

