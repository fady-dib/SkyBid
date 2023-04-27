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

exports.updateAircraft = async (req, res) => {

  try {
  
    if(Object.keys(req.body).length === 0 || !req.body) return res.send("No updates sent")
    const {aircraft, passengers, year_of_manufacture} = req.body
    const aircraft_id = req.params.id
    
    if (!aircraft_id) return res.json(" Invalid aircraft ID")

    const updated_aircraft = await Aircraft.findById({ _id: aircraft_id })
    if (!updated_aircraft) return res.json("aircraft not found")

    updated_aircraft.aircraft = aircraft;
    updated_aircraft.passengers = passengers;
    updated_aircraft.year_of_manufacture = year_of_manufacture

    await updated_aircraft.save()

    return res.json({
      message: "Aircraft updated succesfully",
      updated_aircraft
  });
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong. Please try again later.' });
  }

} 

exports.getAircraftsByOperator = async (req,res) => {
  try{
    const operator_id = req.user._id
    const aircrafts = await Aircraft.find({operator_id}).select("-images")
    if(!aircrafts) return res.json("Operator doesn't have aircrafts")
    return res.json({
      aircrafts
  })
}
  catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong. Please try again later.' });
  }

}

exports.getAircraftById = async (req,res) => {
  try{
    const aircraft_id = req.params.id
    const aircraft = await Aircraft.findOne({_id :aircraft_id})
    if(!aircraft) return res.json("Aircraft not found")
    return res.json({
      aircraft
  })
}
  catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong. Please try again later.' });
  }
}

exports.uploadImage = async (req,res) => {
  try {
    if (!req.files || !req.files.image) return res.status(400).send('No image uploaded');


    const image = req.files.image;
    console.log(image)

    const upload_path = path.join(__dirname, '..', 'Uploads', Date.now() +"-" + image.name);
    image.mv(upload_path, function (err) {

        if (err) {
          console.log(err)
            return res.status(500).send('Error while saving image');
        }

        const newImage = {
            name: Date.now() +"-" + image.name,
            image_type: image.mimetype,
            url: `/uploads/${Date.now() +"-" + image.name}`
        };

       const aircraft = Aircraft.findByIdAndUpdate(req.body.aircraft_id, {
            $push: { images: newImage }
        },
            { new: true })
            .then((aircraft) => {
                aircraft.save()
                    .then(() => {
                        res.json({message:'Image uploaded and saved successfully',aircraft});
                    })
                    .catch((err) => {
                      console.log(err)
                        res.status(500).send('Error while saving image');
                    });
            })
            .catch((err) => {
              console.log(err)
                res.status(500).send('Error while updating aircraft');
            });
    });
}  catch (error) {
  console.error(error);
  res.status(500).json({ message: 'Something went wrong. Please try again later.' });
}
}




