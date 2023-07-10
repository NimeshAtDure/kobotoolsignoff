const express = require('express');

const router = express.Router();


router.get('/', async (req, res) => {
    try {
        
        res.statusCode ="200";

        return res.json({message: "server is running"});
    } catch (error) {
        next (error);
    }
  });


module.exports = router;

