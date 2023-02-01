const express = require("express"); //require impory libraly express
const router = express.Router(); // Ruter() คือการแยกของการเร้า
const Sequelize = require("sequelize");
const formidable = require("formidable");
const path = require("path");
const fs = require("fs-extra");
const constants = require("./constant");
const drugtype = require("./models/drugtype");

router.get("/drugtype", async (req, res) => {
    // const result = await drugtype.findAll({
    //   order: Sequelize.literal("drugtype_id ASC"),
    // });
    const result = await drugtype.findAll({
        
      });
    res.json(result);
  });
  
  router.post("/drugtype", (req, res) => {
    try {
      const form = new formidable.IncomingForm();
      form.parse(req, async (error, fields, files) => {
        //แปล file และ data ด้วยตัวแปร parse
        let result = await drugtype.create(fields);
        
        res.json({
          result: constants.rResultok,
          message: JSON.stringify(result),
        });
      });
    } catch (error) {
      res.json({ result: constants.rResultnot, message: JSON.stringify(error) });
    }
  });
  router.put("/drugtype", (req, res) => {
    try {
      const form = new formidable.IncomingForm();
      form.parse(req, async (err, fields, files) => {
        let result = await drugtype.update(fields, {
          where: { drugtype_id: fields.drugtype_id },
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
  
  router.delete("/drugtype/drugtype_id/:drugtype_id", async (req, res) => {
    try {
      const { drugtype_id } = req.params;
      let result = await drugtype.findOne({ where: { drugtype_id } });
      
      result = await drugtype.destroy({ where: { drugtype_id: drugtype_id } });
      res.json({ result: constants.rResultok, message: JSON.stringify(result) });
      
    } catch (error) {
      
      res.json({ result: constants.rResultnot, message: JSON.stringify(error) });
    }
    });

    router.get("/drugtype/drugtype_id/:drugtype_id", async (req, res)=>{
      try{
          let result = await drugtype.findOne({where:{drugtype_id: req.params.drugtype_id}})
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