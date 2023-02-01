const express = require("express"); //require impory libraly express
const router = express.Router(); // Ruter() คือการแยกของการเร้า
const Sequelize = require("sequelize");
const role = require("./models/role");

router.post("/role", async (req,res)=>{
    const roleadd = await role.create({ role_name:'แพทย์'} )

    console.log(roleadd)
})

router.get("/role", async (req,res)=>{
    const getrole = await role.findAll({  order: Sequelize.literal("role_id DESC") })

    // console.log(getrole)
    res.json(getrole)
})

module.exports = router;