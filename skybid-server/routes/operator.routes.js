const { Router } = require("express");
const router = Router();

const {addAircraft} = require('../controllers/operator.controller')

router.post("/addAircraft", addAircraft);


module.exports = router;