const { Router } = require("express");
const router = Router();

const {addAircraft, deleteAircraft, updateAircraft, getAircraftsByOperator, getAircraftById, uploadImage, deleteImage} = require('../controllers/aircraft.controller')

router.post("", addAircraft);
router.put("/:id", updateAircraft);
router.get("",getAircraftsByOperator);
router.get("/:id",getAircraftById);
router.post("/image", uploadImage);
router.delete("/image", deleteImage)
router.delete("/:id", deleteAircraft);


module.exports = router;