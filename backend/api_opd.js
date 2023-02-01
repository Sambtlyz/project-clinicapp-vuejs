const express = require("express"); //require impory libraly express
const router = express.Router(); // Ruter() คือการแยกของการเร้า
const Sequelize = require("sequelize");

const formidable = require("formidable"); //แยกข้อมูลของ form data
const path = require("path");
const fs = require("fs-extra");
const constants = require("./constant");
const opd = require("./models/opd");
const Customer = require("./models/customer");

//get data by customer
router.get("/opd/customer_id_pri/:customer_id_pri", async (req,res) => {
  try{
    let result = await opd.findOne({where:{customer_id_pri: req.params.customer_id_pri}})
    if (result){
        res.json(result)
    }else{
        res.json({});
    }
}catch(error){
    return false;
}
});



// router.get("/opd/opd_id/:opd_id", async (req,res) => {
//   try{
//     let result = await opd.findOne({where:{customer_id_pri: req.params.customer_id_pri}})
//     if (result){
//         res.json(result)
//     }else{
//         res.json({});
//     }
// }catch(error){
//     return false;
// }
// });

// router.get("/opd/opd_id/:opd_id", async (req,res) => {
//   try{
//     let result = await opd.findOne({where:{customer_id_pri: req.params.customer_id_pri}})
//     if (result){
//         res.json(result)
//     }else{
//         res.json({});
//     }
// }catch(error){
//     return false;
// }
// });

//test join 
// router.get("/opd" , async (req,res) => {
//   const result = await opd.findAll({ include : {model: Customer , require: true}})
//   console.log(JSON.stringify(result , null, 2))
// })

router.get("/opd", async (req, res) => {
    const result = await opd.findAll({
      order: Sequelize.literal("opd_id DESC"),
    });
    res.json(result);
  });


router.post("/opd", (req, res) => {
    try {
      const form = new formidable.IncomingForm();
      form.parse(req, async (error, fields, files) => {
        //แปล file และ data ด้วยตัวแปร parse
        let result = await opd.create(fields);
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


  // router.post("/opd/customer_id_pri/:customer_id_pri", async (req,res) => {
  //   try{
  //     const form = new formidable.IncomingForm();
  //     form.parse(req, async (error, fields, files) => {
  //       //แปล file และ data ด้วยตัวแปร parse
       
  //     let result = await opd.create(fields,{where:{customer_id_pri: req.params.customer_id_pri}})
  //     res.json({
  //                 result: constants.rResultok,
  //                 message: JSON.stringify(result),
  //               });
  //             });
  //           } catch (error) {
  //             res.json({ result: constants.rResultnot, message: JSON.stringify(error) });
  //           }
  //         });

  router.put("/opd", (req, res) => {
    // console.log(result)
    
    try {
      const form = new formidable.IncomingForm();
      form.parse(req, async (err, fields, files) => {
        let result = await opd.update(fields, {
          where: { opd_id: fields.opd_id },
          
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

  router.delete("/opd/opd_id/:opd_id", async (req, res) => {
    try {
      const { opd_id } = req.params;
      let result = await opd.findOne({ where: { opd_id } });
      
      result = await opd.destroy({ where: { opd_id: opd_id } });
      res.json({ result: constants.rResultok, message: JSON.stringify(result) });
      
    } catch (error) {
      
      res.json({ result: constants.rResultnot, message: JSON.stringify(error) });
    }
    });

module.exports = router;