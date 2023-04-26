const { Router } = require("express");
const router = Router();

const {addAircraft, deleteAircraft} = require('../controllers/aircraft.controller')

router.post("", addAircraft);
router.delete("/:id", deleteAircraft)


module.exports = router;