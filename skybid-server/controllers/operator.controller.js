const multer = require('multer');
const Fleet = require('../models/fleetModel')

const storageEngine = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/') 
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname) 
    }
})

const upload = multer({ storage: storageEngine })

exports.addAircraft = async (req,res) => {

    try {
        const { operator_id, aircraft, passengers, year_of_manufacture } = req.body;
        
        const files = req.files;
        
        const image = files.map((file) => file.path);
    
        const newFleet = new Fleet({
          operator_id,
          aircraft,
          image,
          passengers,
          year_of_manufacture
        });
        
        await newFleet.save();
        
        res.status(201).json({ message: "Aircraft added successfully!" });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong. Please try again later." });
      }

}