const express = require("express");  //require impory libraly express
const router = express.Router();  // Ruter() คือการแยกของการเร้า

router.use(require("./api_auth"))
router.use(require("./api_customer"))

module.exports = router;