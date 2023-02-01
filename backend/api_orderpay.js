const express = require("express"); //require impory libraly express
const router = express.Router(); // Ruter() คือการแยกของการเร้า
const Sequelize = require("sequelize");

const formidable = require("formidable"); //แยกข้อมูลของ form data
const path = require("path");
const fs = require("fs-extra");
const constants = require("./constant");
const Orderpay = require("./models/orderpay");


router.get("/orderpay", async (req,res)=>{
    const data = await Orderpay.findAll({ })
    res.json(data)
})

router.get("/sumorderpay", async (req,res)=>{
  const result = await Orderpay.findAll({
    attributes:[[Sequelize.fn('sum' , Sequelize.col('orderpay_total')), 'sumtotalpay']]  });

  res.json(result);
})

router.get("/orderpay/customer_id_pri/:customer_id_pri", async (req,res) => {
  try{
    let result = await Orderpay.findAll({where:{customer_id_pri: req.params.customer_id_pri}})
    if (result){
        res.json(result)
    }else{
        res.json({});
    }
}catch(error){
    return false;
}
});

router.post("/orderpay", async (req,res)=>{
    try {
        const form = new formidable.IncomingForm();
        form.parse(req, async (error, fields) => {
          let result = await Orderpay.create(fields);
          res.json({
            result: constants.rResultok,
            message: JSON.stringify(result),
          });
        });
      } catch (error) {
        res.json({ result: constants.rResultnot, message: JSON.stringify(error) });
      }
      
    
});

router.put("/orderpay", (req, res) => {
  // console.log(result)
  
  try {
    const form = new formidable.IncomingForm();
    form.parse(req, async (err, fields, files) => {
      let result = await Orderpay.update(fields, {
        where: { orderpay_id_pri: fields.orderpay_id_pri },
        
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



module.exports = router;