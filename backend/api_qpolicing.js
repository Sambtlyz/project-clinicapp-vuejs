const express = require("express")
const router = express.Router()
const Sequelize = require("sequelize")
const formidable = require("formidable")
const qpolicing = require("./models/qpolicing")
const opd = require("./models/opd")

const customer = require("./models/customer");


// router.get("/qpolicing", async (req,res)=>{
//     const result = await qpolicing.findAll({
//         order: Sequelize.literal("qpolicing_id DESC")
//     })

//     res.json(result);
// })
router.get("/qpolicing", async (req,res)=>{
    const result = await qpolicing.findAll({ });

    res.json(result)
})


router.post("/qpolicing",  ( req, res )=>{
    const form = new formidable.IncomingForm();
    form.parse(req, async (error, fields, files) => {
        let result = await qpolicing.create(fields);
        let result1 = await opd.create({opd_id:"" , customer_id_pri: ""});
       
        res.json({message: JSON.stringify(result), message: JSON.stringify(result1),});
        return false;
      });
    
    //   const amidala = await qpolicing.create({ opd_code:'OPD001ss'});
    //   const opdadd = await opd.create({ opd_code:'OPD001s',customer_id_pri:'43' });
    //   await amidala.addOpd(opdadd, { through: { selfGranted: false } });
    //   const result = await qpolicing.findOne({
    //     where: { opd_code:'OPD001' },
    //     include: opd
    //   });
    //   console.log(amidala,opdadd);

      
      
})

// router.post("/qpolicing", async (req,res)=>{
//     const { customer_id_pri, opd_code, opd_date, room_name, room_id, customer_fullname, user_fullname,} = req.body
//     let result = await qpolicing.create({
//         customer_id_pri: customer_id_pri,
//         opd_code: opd_code,
//         opd_date: opd_date,
//         room_name: room_name,
//         room_id: room_id,
//         customer_fullname: customer_fullname,
//         user_fullname: user_fullname,
        
//     })
//     return result
    
// })

router.get("/qpolicing/customer_id_pri/:customer_id_pri", async (req, res)=>{
    try{
        let result = await qpolicing.findOne({where:{customer_id_pri: req.params.customer_id_pri}})
        if (result){
            res.json(result)
        }else{
            res.json({});
        }
    }catch(error){
        return false;
    }
  });


module.exports = router;