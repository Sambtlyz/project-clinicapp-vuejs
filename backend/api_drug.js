const express = require("express"); //require impory libraly express
const router = express.Router(); // Ruter() คือการแยกของการเร้า
const Sequelize = require("sequelize");

const formidable = require("formidable"); //แยกข้อมูลของ form data
const path = require("path");
const fs = require("fs-extra");
const constants = require("./constant");
const drug = require("./models/drug");
const drugType = require("./models/drugtype");


router.get("/drug", async (req, res) => {
    const result = await drug.findAll({
      order: Sequelize.literal("drug_id_pri DESC"),
    });
  res.json(result);
  });

  router.get("/countdrug", async (req, res) => {
    const result = await drug.findAll({
      attributes:[[Sequelize.fn('count' , Sequelize.col('drug_id_pri')), 'drugcount']]  });
  res.json(result);
  });





  router.post("/drug", (req, res) => {
    try {
      const form = new formidable.IncomingForm();
      form.parse(req, async (error, fields, files) => {
        //แปล file และ data ด้วยตัวแปร parse
        let result = await drug.create(fields);
        // result = await drug.create(fields, result);
        res.json({
          result: constants.rResultok,
          message: JSON.stringify(result),
        });
      });
    } catch (error) {
      res.json({ result: constants.rResultnot, message: JSON.stringify(error) });
    }
  });

  router.put("/drug", (req, res) => {
    try {
      const form = new formidable.IncomingForm();
      form.parse(req, async (err, fields, files) => {
        let result = await drug.update(fields, {
          where: { drug_id_pri: fields.drug_id_pri },
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
  
  router.delete("/drug/drug_id_pri/:drug_id_pri", async (req, res) => {
    try {
      const { drug_id_pri } = req.params;
      let result = await drug.findOne({ where: { drug_id_pri } });
      
      result = await drug.destroy({ where: { drug_id_pri: drug_id_pri } });
      res.json({ result: constants.rResultok, message: JSON.stringify(result) });
      
    } catch (error) {
      
      res.json({ result: constants.rResultnot, message: JSON.stringify(error) });
    }
    });

    router.get("/drug/drug_id_pri/:drug_id_pri", async (req, res)=>{
      try{
          let result = await drug.findOne({where:{drug_id_pri: req.params.drug_id_pri}})
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