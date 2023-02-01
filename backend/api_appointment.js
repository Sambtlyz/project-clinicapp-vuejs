const express = require("express"); //require impory libraly express
const router = express.Router(); // Ruter() คือการแยกของการเร้า
const Sequelize = require("sequelize");

const formidable = require("formidable"); //แยกข้อมูลของ form data
const path = require("path");
const fs = require("fs-extra");
const constants = require("./constant");
const Appointment = require("./models/appointment");



router.get("/appointment", async (req, res) => {
    const result = await Appointment.findAll({
      order: Sequelize.literal("appointment_id_pri DESC"),
    });
    res.json(result);
});

router.put("/appointment", (req, res) => {
    // console.log(result)
    
    try {
      const form = new formidable.IncomingForm();
      form.parse(req, async (err, fields, files) => {
        let result = await Appointment.update(fields, {
          where: { appointment_id_pri: fields.appointment_id_pri },
          
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

  router.delete("/appointment/appointment_id_pri/:appointment_id_pri", async (req, res) => {
    try {
      const { appointment_id_pri } = req.params;
      let result = await Appointment.findOne({ where: { appointment_id_pri } });
      
      result = await Appointment.destroy({ where: { appointment_id_pri: appointment_id_pri } });
      res.json({ result: constants.rResultok, message: JSON.stringify(result) });
      
    } catch (error) {
      
      res.json({ result: constants.rResultnot, message: JSON.stringify(error) });
    }
    });

router.post("/appointment", (req, res) => {
    try {
      const form = new formidable.IncomingForm();
      form.parse(req, async (error, fields, files) => {
        //แปล file และ data ด้วยตัวแปร parse
        let result = await Appointment.create(fields);
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

module.exports = router;