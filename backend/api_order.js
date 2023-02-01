const express = require("express"); //require impory libraly express
const router = express.Router(); // Ruter() คือการแยกของการเร้า
const Sequelize = require("sequelize");

const formidable = require("formidable"); //แยกข้อมูลของ form data
const path = require("path");
const fs = require("fs-extra");
const constants = require("./constant");
const Order = require("./models/order");




router.get("/order", async (req,res)=>{
    const data = await Order.findAll({ })
    res.json(data)
})

router.get("/order/customer_id_pri/:customer_id_pri", async (req,res) => {
  try{
    let result = await Order.findAll({where:{customer_id_pri: req.params.customer_id_pri}})
    if (result){
        res.json(result)
    }else{
        res.json({});
    }
}catch(error){
    return false;
}
});

router.post("/order", async (req,res)=>{
    try {
        const form = new formidable.IncomingForm();
        form.parse(req, async (error, fields) => {
          let result = await Order.create(fields);
          res.json({
            result: constants.rResultok,
            message: JSON.stringify(result),
          });
        });
      } catch (error) {
        res.json({ result: constants.rResultnot, message: JSON.stringify(error) });
      }
      
    
});
router.put("/opd", (req, res) => {
  // console.log(result)
  
  try {
    const form = new formidable.IncomingForm();
    form.parse(req, async (err, fields, files) => {
      let result = await opd.update(fields, {
        where: { order_id_pri: fields.order_id_pri },
        
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

router.delete("/order/order_id_pri/:order_id_pri", async (req, res) => {
  try {
    const { order_id_pri } = req.params;
    let result = await Order.findOne({ where: { order_id_pri } });
    
    result = await Order.destroy({ where: { order_id_pri: order_id_pri } });
    res.json({ result: constants.rResultok, message: JSON.stringify(result) });
    
  } catch (error) {
    
    res.json({ result: constants.rResultnot, message: JSON.stringify(error) });
  }
  });
// router.post("/order", async (req,res)=>{
//     const { policing_id_pri, customer_id_pri, opd_id} = req.body
//     try {
//         const order = await Order.create({policing_id_pri, customer_id_pri, opd_id})
//         return res.json(order)
//       } catch (error) {
//         return res.status(500).res.json(error)
//       }
// })

module.exports = router;