const { Router } = require("express");
const router = Router();

const {addAircraft, deleteAircraft, updateAircraft, getAircraftsByOperator} = require('../controllers/aircraft.controller')

router.post("", addAircraft);
router.delete("/:id", deleteAircraft);
router.put("/:id", updateAircraft);
router.get("",getAircraftsByOperator)


module.exports = router;