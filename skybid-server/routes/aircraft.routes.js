const { Router } = require("express");
const router = Router();

const {addAircraft, deleteAircraft, updateAircraft, getAircraftsByOperator, getAircraftById, uploadImage} = require('../controllers/aircraft.controller')

router.post("", addAircraft);
router.delete("/:id", deleteAircraft);
router.put("/:id", updateAircraft);
router.get("",getAircraftsByOperator);
router.get("/:id",getAircraftById);
router.post("/image", uploadImage)


module.exports = router;