const express = require("express"); //require impory libraly express
const router = express.Router(); // Ruter() คือการแยกของการเร้า
const Sequelize = require("sequelize");

const formidable = require("formidable"); //แยกข้อมูลของ form data
const path = require("path");
const fs = require("fs-extra");
const constants = require("./constant");
const policing = require("./models/policing");


router.get("/policing", async (req, res) => {
    const result = await policing.findAll({
      order: Sequelize.literal("policing_id_pri DESC"),
    });
    //  const result = await policing.findAll({
    //   attributes: [[Sequelize.fn('SUM', Sequelize.col('policing_cost')), 'policing_cost']],
        
    // }).then(r => r);

    
    res.json(result);
  });

  router.get("/countpolicing", async (req, res) => {
    const result = await policing.findAll({
      attributes:[[Sequelize.fn('count' , Sequelize.col('policing_id_pri')), 'policingcount']]  });
    res.json(result);
  });

  router.post("/policing", (req, res) => {
    try {
      const form = new formidable.IncomingForm();
      form.parse(req, async (error, fields) => {
        //แปล file และ data ด้วยตัวแปร parse
        let result = await policing.create(fields);
        // result = await policing.create(fields, result);
        res.json({
          result: constants.rResultok,
          message: JSON.stringify(result),
        });
      });
    } catch (error) {
      res.json({ result: constants.rResultnot, message: JSON.stringify(error) });
    }
  });

  router.put("/policing", (req, res) => {
    try {
      const form = new formidable.IncomingForm();
      form.parse(req, async (err, fields) => {
        let result = await policing.update(fields, {
          where: { policing_id_pri: fields.policing_id_pri },
        });
        res.json({
          result: constants.rResultok,
          message: JSON.stringify(result),
        });
      });
    } catch (error) {
      res.json({ result: constants.rResultnot, message: JSON.stringify(error) });
    }
  });
  
  router.delete("/policing/policing_id_pri/:policing_id_pri", async (req, res) => {
    try {
      const { policing_id_pri } = req.params;
      let result = await policing.findOne({ where: { policing_id_pri } });
      
      result = await policing.destroy({ where: { policing_id_pri: policing_id_pri } });
      res.json({ result: constants.rResultok, message: JSON.stringify(result) });
      
    } catch (error) {
      
      res.json({ result: constants.rResultnot, message: JSON.stringify(error) });
    }
    });

    router.get("/policing/policing_id_pri/:policing_id_pri", async (req, res)=>{
      try{
          let result = await policing.findOne({where:{policing_id_pri: req.params.policing_id_pri}})
          if (result){
              res.json(result)
          }else{
              res.json({});
          }
      }catch(error){
          res.json({});
      }
    })



module.exports = router;