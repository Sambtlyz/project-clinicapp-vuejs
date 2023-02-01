const express = require("express");  //require impory libraly express
const router = express.Router();  // Ruter() คือการแยกของการเร้า

router.use(require("./api_auth"))
router.use(require("./api_customer"))
router.use(require("./api_drug"))
router.use(require("./api_drugtype"))
router.use(require("./api_policing"))
router.use(require("./api_policingtype"))
router.use(require("./api_opd"))
router.use(require("./api_qpolicing"))
router.use(require("./api_roomadd"))
router.use(require("./api_role"))
router.use(require("./api_policing_temp"))
router.use(require("./api_order"))
router.use(require("./api_orderpay"))
router.use(require("./api_appointment"))

module.exports = router;