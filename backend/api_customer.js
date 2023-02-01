const express = require("express"); //require impory libraly express
const router = express.Router(); // Ruter() คือการแยกของการเร้า
const Sequelize = require("sequelize");
const customer = require("./models/customer");
const opd = require("./models/opd");
const formidable = require("formidable"); //แยกข้อมูลของ form data
const path = require("path");
const fs = require("fs-extra");
const constants = require("./constant");
const qpolicing = require("./models/qpolicing")
const drug = require("./models/drug");
// const { where } = require("sequelize");



// ** query database on SQLITE
router.get("/customer", async (req, res) => {
  const result = await customer.findAll({
    order: Sequelize.literal("customer_id_pri ASC"),
  });
  res.json(result);
});

router.get("/customerfullname", async (req, res) => {
  const result = await customer.findAll({
    attributes: ['customer_fname', ['customer_fname','customer_lname'], 'customer_fname']
  });
  res.json(result);
});

// router.get("/countcustomer", async (req,res)=>{
//   const result = await customer.findAll({
//     attributes:[[Sequelize.fn('sum', Sequelize.col('customer_id_pri')), 'sumcustomer']]
//   });
//   res.json(result);
// })
router.get("/countcustomer", async (req,res)=>{
  const result = await customer.findAll({
    attributes:[[Sequelize.fn('count' , Sequelize.col('customer_fname')), 'customercount']]  });

  res.json(result);
  
})

// router.get("/customer", async (req, res, ) => {
//   const result = await customer.findAll({
//     attributes: ['customer_fname', ['customer_fname','customer_fullname'], 'customer_lname']
//       });
//   const result1 = await opd.findAll({})
//       res.json(result, result1);
      
  
// });

// attributes: [models.sequelize.literal("first_name || ' ' || last_name"), 'full_name']

router.post("/customer", (req, res) => {
  try {
    const form = new formidable.IncomingForm();
    form.parse(req, async (error, fields, files) => {
      //แปล file และ data ด้วยตัวแปร parse
      let result = await customer.create(fields);
      result = await uploadImage(files, result);
      res.json({
        result: constants.rResultok,
        message: JSON.stringify(result),
      });
    });
  } catch (error) {
    res.json({ result: constants.rResultnot, message: JSON.stringify(error) });
  }
});

router.put("/customer", (req, res) => {
  // console.log(result)
  try {
    const form = new formidable.IncomingForm();
    form.parse(req, async (err, fields, files) => {
      let result = await customer.update(fields, {
        where: { customer_id_pri: fields.customer_id_pri },
      });
      result = await uploadImage(files, fields);
      res.json({
        result: constants.rResultok,
        message: JSON.stringify(result),
      });
    });
  } catch (error) {
    res.json({ result: constants.rResultnot, message: JSON.stringify(error) });
  }
});

router.delete("/customer/customer_id_pri/:customer_id_pri", async (req, res) => {
  try {
    const { customer_id_pri } = req.params;
    let result = await customer.findOne({ where: { customer_id_pri } });
    await fs.remove(__dirname + "/uploaded/images/" + result.customer_image);
    result = await customer.destroy({ where: { customer_id_pri: customer_id_pri } });
    res.json({ result: constants.rResultok, message: JSON.stringify(result) });
    
  } catch (error) {
    
    res.json({ result: constants.rResultnot, message: JSON.stringify(error) });
  }
  });

// Upload Image
uploadImage = async (files, doc) => {
  console.log(files);
  if (files.customer_image != null) {
    // console.log('********************************* doc ' , doc )
    var fileExtention = files.customer_image.name.split(".")[1];
    doc.customer_image = `${doc.customer_id_pri}.${fileExtention}`;
    var newpath = path.resolve(
      __dirname + "/uploaded/images/" + "/" + doc.customer_image
    );

    if (fs.exists(newpath)) {
      await fs.remove(newpath);
    }
    await fs.moveSync(files.customer_image.path, newpath);

    // Update database
    let result = customer.update(
      { customer_image: doc.customer_image },
      { where: { customer_id_pri: doc.customer_id_pri } }
    );
    return result;
  }
};
// อันเดิม
router.get("/customer/customer_id_pri/:customer_id_pri", async (req, res)=>{
  try{
      let result = await customer.findOne({where:{customer_id_pri: req.params.customer_id_pri}})
      // let result = await customer.findOne({where:{customer_id_pri: req.params.customer_id_pri}, include: qpolicing})
      
      if (result ){
          res.json(result)
      }else{
          res.json({});
      }
  }catch(error){
      res.json({});
  }
})


module.exports = router;
