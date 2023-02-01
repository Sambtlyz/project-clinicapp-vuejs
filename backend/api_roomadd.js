const express = require("express"); //require impory libraly express
const router = express.Router(); // Ruter() คือการแยกของการเร้า
const formidable = require("formidable"); //แยกข้อมูลของ form data
const room = require("./models/room");
const constants = require("./constant");

router.post ("/roomadd" , (req,res)=>{
    const from = new formidable.IncomingForm();
    from.parse(req, async (error,fields,files)=>{
        let result = await room.create(fields)

        res.json({message: JSON.stringify(result)})
        return false;
    })
})

router.get("/roomadd", async (req,res)=>{
    const result = await room.findAll()

    res.json(result);
})

router.delete("/roomadd/room_id/:room_id", async (req, res) => {
    try {
      const { room_id } = req.params;
      let result = await room.findOne({ where: { room_id } });
      
      result = await room.destroy({ where: { room_id: room_id } });
      res.json({ result: constants.rResultok, message: JSON.stringify(result) });
      
    } catch (error) {
      
      res.json({ result: constants.rResultnot, message: JSON.stringify(error) });
    }
    });

module.exports = router;