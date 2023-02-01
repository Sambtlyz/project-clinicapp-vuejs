const express = require("express"); //require impory libraly express
const router = express.Router(); // Ruter() คือการแยกของการเร้า
const Sequelize = require("sequelize");
const formidable = require("formidable"); //แยกข้อมูลของ form data
const constants = require("./constant");
const policingtype = require("./models/policingtype");



router.post("/policingtype" , ( req, res) => {
        const form = new formidable.IncomingForm();
        form.parse(req, async (error, fields, files) => {
          let result = await policingtype.create(fields);
         
          res.json({message: JSON.stringify(result),});
          return false;
        });
    });

router.get("/policingtype", async (req, res) => {
        // const result = await drugtype.findAll({
        //   order: Sequelize.literal("drugtype_id ASC"),
        // });
        const result = await policingtype.findAll({
            
          });
        res.json(result);
});
router.put("/policingtype", (req, res) => {
    try {
      const form = new formidable.IncomingForm();
      form.parse(req, async (err, fields, files) => {
        let result = await policingtype.update(fields, {
          where: { policingtype_id: fields.policingtype_id },
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

router.delete("/policingtype/policingtype_id/:policingtype_id", async (req, res) => {
    try {
      const { policingtype_id } = req.params;
      let result = await policingtype.findOne({ where: { policingtype_id } });
      
      result = await policingtype.destroy({ where: { policingtype_id: policingtype_id } });
      res.json({ result: constants.rResultok, message: JSON.stringify(result) });
      
    } catch (error) {
      
      res.json({ result: constants.rResultnot, message: JSON.stringify(error) });
    }
});

router.get("/policingtype/policingtype_id/:policingtype_id", async (req, res)=>{
    try{
        let result = await policingtype.findOne({where:{policingtype_id: req.params.policingtype_id}})
        if (result){
            res.json(result)
        }else{
            res.json({});
        }
    }catch(error){
        return false;
    }
  })

module.exports = router;