const express = require("express");  //require impory libraly express
const router = express.Router();  // Ruter() คือการแยกของการเร้า

router.get("/login" , (req , res)=>{
    res.json({result:"Hello"})
})

module.exports = router;