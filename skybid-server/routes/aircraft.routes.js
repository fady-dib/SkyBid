const { Router } = require("express");
const router = Router();

const {addAircraft, deleteAircraft, updateAircraft} = require('../controllers/aircraft.controller')

router.post("", addAircraft);
router.delete("/:id", deleteAircraft);
router.put("/:id", updateAircraft)


module.exports = router;