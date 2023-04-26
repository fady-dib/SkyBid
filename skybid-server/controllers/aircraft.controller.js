// const multer = require('multer');
// const Aircraft = require('../models/aircraftModel');
// const path = require('path');



// const storageEngine = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, path.join(__dirname, 'images'));
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + '-' + file.originalname);
//   }
// });

// const upload = multer({ storage: storageEngine }).array('image');




// exports.addAircraft = async (req, res) => {
//   try {
//     const { operator_id, aircraft, passengers, year_of_manufacture } = req.body;
//     console.log(req.body)

//     if (!operator_id || !aircraft || !passengers || !year_of_manufacture) {
//       return res.status(400).json({
//         message: 'Content cannot be empty!'
//       });
//     }

//     upload(req, res, async function (err) {
//       if (err instanceof multer.MulterError) {
//         return res.status(500).json({ message: 'Error uploading files!' });
//       } else{


//       if (!req.files) {
//         throw new Error('No files were uploaded');
//       }


//       const images = req.files.map((file) => file.path);

//       const newAircraft = new Aircraft({
//         operator_id,
//         aircraft,
//         images,
//         passengers,
//         year_of_manufacture
//       });

//       await newAircraft.save();

//       return res.status(201).json({ message: 'Aircraft added successfully!' });
//    } });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Something went wrong. Please try again later.' });
//   }
// };

const Aircraft = require('../models/aircraftModel');
const path = require('path');

exports.addAircraft = async (req, res) => {
  try {
    const { aircraft, passengers, year_of_manufacture } = req.body;
    if (!aircraft || !passengers || !year_of_manufacture) {
      return res.status(400).json({
        message: 'Content cannot be empty!'
      });
    }

    const operator_id = req.user._id;

    const newAircraft = new Aircraft({
      operator_id,
      aircraft,
      passengers,
      year_of_manufacture
    });

    await newAircraft.save();

    return res.status(201).json({ message: 'Aircraft added successfully!', newAircraft });
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong. Please try again later.' });
  }
}

exports.deleteAircraft = async (req, res) => {

  try {
    const aircraft_id = req.params.id
    if (!aircraft_id) return res.json(" Invalid aircraft ID")

    const aircraft = await Aircraft.findOneAndDelete({ _id: aircraft_id })

    if (!aircraft) return res.json("aircraft not found")

    return res.json({ message: 'Aircraft deleted successfully!', aircraft })
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong. Please try again later.' });
  }

}




