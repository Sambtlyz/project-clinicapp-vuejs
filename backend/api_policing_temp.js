const express = require("express"); //require impory libraly express
const router = express.Router(); // Ruter() คือการแยกของการเร้า
const Sequelize = require("sequelize");

const Policing_temp = require("./models/opdpolicing_temp");
const formidable = require("formidable");
const constants = require("./constant");


router.post("/policing_temp", async (req, res) => {
  const form = new formidable.IncomingForm();
  form.parse(req, async (error, fields, files) => {
    //แปล file และ data ด้วยตัวแปร parse
    let result = await policing_temp.create(fields);
    res.json({
      result: constants.rResultok,
      message: JSON.stringify(result),
    });
  });

  // const policing_temp = {
    
  //   opd_id: req.body.opd_id,
  //   policing_id_pri: req.body.policing_id_pri,
  //   opdpolicing_temp_code: req.body.opdpolicing_temp_code,
  //   opdpolicing_temp_name: req.body.opdpolicing_temp_name,
  //   opdpolicing_temp_cost: req.body.opdpolicing_temp_cost
  // }

});

// router.post('/policing_temp', async (req, res) =>{
//     return await policing_temp.create({
//         opdpolicing_temp_id: req.body.opdpolicing_temp_id,
//         opdpolicing_temp_name: req.body.opdpolicing_temp_name,
//         opdpolicing_temp_cost: req.body.opdpolicing_temp_cost,
//         opd_id: req.body.opd_id,
//         policing_id_pri: req.body.policing_id_pri
//     }).then(function (policing_temp) {
//         if (policing_temp) {
//             res.send(policing_temp);
//         } else {
//             res.status(400).send('Error in insert new record');
//         }
//     });
// });

// router.post("/policing_temp", async (req,res)=>{
//     const {opdpolicing_temp_code, opdpolicing_temp_name, opdpolicing_temp_cost, opd_id, policing_id_pri} = req.body

//     let data = await policing_temp.create({
//         opdpolicing_temp_code: this.opdpolicing_temp_code,
//         opdpolicing_temp_name: this.opdpolicing_temp_name,
//         opdpolicing_temp_cost: this.opdpolicing_temp_cost,
//         opd_id: this.opd_id,
//         policing_id_pri: this.policing_id_pri
//     })
//     res.json({ data: constants.rResultok, message: JSON.stringify(data)})
//     return data
// })

router.get("/policing_temp", async (req,res) => {
    const data = await policing_temp.findAll({});

    res.json(data);
});

module.exports = router;
