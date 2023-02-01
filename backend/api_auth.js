const express = require("express"); //require impory libraly express
const router = express.Router(); // Ruter() คือการแยกของการเร้า
const user = require("./models/user");
const bcrypt = require("bcryptjs");
const constants = require("./constant");
const Sequelize = require("sequelize");
const formidable = require("formidable");

router.get("/login" , async (req,res)=>{
  const datauser = await user.findAll({ order: Sequelize.literal( "user_id DESC")})
  res.json(datauser);
})

router.post("/login", async (req, res) => {
  console.log("login: " + JSON.stringify(req.body));
  const { username, password } = req.body;
  const result = await user.findOne({ where: { username: username } }); // ตรวจสอบว่ามี username อยู่ ไหม โดยใช้คำสั่ง where
  try {
    if (result) {
      if (bcrypt.compareSync(password, result.password)) {
        res.json({
          result: constants.rResultok,
          message: JSON.stringify(result),
        });
      } else {
        res.json({
          result: constants.rResultnot,
          message: "รหัสผ่านไม่ถูกต้อง",
        });
      }
    } else {
      res.json({
        result: constants.rResultnot,
        message: "ชื่อผู้ใช้ไม่ถูกต้อง",
      });
    }
  } catch (error) {
    res.json({ result: constants.rResultnot, message: JSON.stringify(error) });
  }
});

router.post("/register", async (req, res) => {
  //ตัวแปรแบบ promiss ต้องมี async await
  try {
    console.log("register: " + JSON.stringify(req.body));
    req.body.password = await bcrypt.hash(req.body.password, 8); //encript password การเข้ารหัสพาสเวิร์ด
    let result = await user.create(req.body);
    res.jon({ result: constants.rResultok, message: JSON.stringify(result) });
  } catch (error) {
    res.json({ result: constants.rResultnot, message: JSON.stringify(error) }); // check username ซ้ำ
  }
});


// router.get("/profile/user_id/:user_id", async (req, res)=>{
//   try{
//       let result = await user.findOne({where:{user_id: req.params.user_id}})
//       if (result){
//           res.json(result)
//       }else{
//           res.json({});
//       }
//   }catch(error){
//       res.json({});
//   }
// })

router.get("/login/user_id/:user_id", async (req,res)=>{
  try{
    let result = await user.findOne({where:{user_id: req.params.user_id}})
    if (result){
        res.json(result)
    }else{
        res.json({});
    }
}catch(error){
    res.json({});
}
})

// router.put("/login", (req, res) => {
//   try {
//     const form = new formidable.IncomingForm();
//     form.parse(req, async (err, fields, files) => {
//       let result = await user.update(fields, {
//         where: { user_id: fields.user_id },
//       });
//       res.json({
//         result: constants.rResultok,
//         message: JSON.stringify(result),
//       });
//     });
//   } catch (error) {
//     res.json({ result: constants.rResultnot, message: JSON.stringify(error) });
//   }
// });


// router.post("/changepassword", async (req, res) => {
//   const { currentPassword, newPassword, confirmNewPassword } = req.body;
//   const userID = req.body.user_id;
//   let errors = [];
//   //Check required fields
//   if (!currentPassword || !newPassword || !confirmNewPassword) {
//       errors.push({ msg: "Please fill in all fields." });
//   }
  
//   //Check passwords match
//   if (newPassword !== confirmNewPassword) {
//       errors.push({ msg: "New passwords do not match." });
//   }
  
  
  
//   if (errors.length > 0) {
//       res.render("changepassword", {
//           errors,
//           username: req.body.username,
//       });
//   } else {
//       //VALIDATION PASSED
//       //Ensure current password submitted matches
//      await user.findOne({ user_id: userID }).then(async body => {
//           //encrypt newly submitted password
//           const isMatch = await bcrypt.compare(currentPassword, user.password);
//           if (isMatch) {
//                   //Update password for user with new password
//                   bcrypt.genSalt(10, (err, salt) =>
//                       bcrypt.hash(newPassword, salt, (err, hash) => {
//                           if (err) throw err;
//                           body.password = hash;
//                           body.save();
//                       })
//                   );
//                   req.flash("success_msg", "Password successfully updated!");
//                   res.redirect("/setting");
//               } else {
//                   //Password does not match
//                   errors.push({ msg: "Current password is not a match." });
//                   res.render("changepassword", {
//                       errors,
//                       name: req.body.name,
//                     });
//                   }
//                 });
//               }
//             });

module.exports = router;
