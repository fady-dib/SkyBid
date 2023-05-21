const Aircraft = require('../models/aircraftModel');
const path = require('path');
const fs = require('fs')

exports.addAircraft = async (req, res) => {
  try {
    const { aircraft, passengers, year } = req.body;
    if (!aircraft || !passengers || !year) {
      return res.status(400).json({
        message: 'Content cannot be empty!'
      });
    }

    const operator = req.user._id;

    const newAircraft = new Aircraft({
      operator,
      aircraft,
      passengers,
      year_of_manufacture : year
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

    if (aircraft.image) {
      await fs.promises.unlink(aircraft.image.url, (err) => {
           if (err) console.log(err);
       });
    }


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
    const operator = req.user._id
    const aircrafts = await Aircraft.find({operator})
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


    console.log('Request body:', req.body); 
    console.log('Request files:', req.files);
    if (!req.files || !req.files.image) return res.status(400).send('No image uploaded');


    const image = req.files.image;
    console.log(image)

    const image_name =  Date.now() +"-" + image.name
    const upload_path = path.join(__dirname, '..', 'Uploads', image_name);
    image.mv(upload_path, async function (err) {

        if (err) {
          console.log(err)
            return res.status(500).send('Error while saving image');
        }

        const newImage = {
            name: image_name,
            image_type: image.mimetype,
            url: `Uploads/${image_name}`
        };

        console.log("123",newImage)

       const aircraft = await Aircraft.findByIdAndUpdate(req.body.aircraft_id, {
            $set: { image: newImage }
        },
            { new: true })
            return    res.json({message:'Image uploaded and saved successfully',aircraft});
    });
}  catch (error) {
  console.error(error);
  res.status(500).json({ message: 'Something went wrong. Please try again later.' });
}
}


exports.updateImage = async (req, res) => {
  try {
    console.log('Request headers:', req.headers);
  console.log('Request body:', req.body);
  console.log('Request files:', req.files);
    if (!req.files || !req.files.image) return res.status(400).send('No image uploaded');

    const image = req.files.image;
    const aircraft_id = req.body.aircraft_id;
    const aircraft = await Aircraft.findById(aircraft_id);

    if (aircraft.image) {
      const old_image_path = path.join(__dirname, '..', aircraft.image.url);
      fs.unlinkSync(old_image_path);
    }
    const image_name = Date.now() + '-' + image.name;
    const upload_path = path.join(__dirname, '..', 'Uploads', image_name);
    image.mv(upload_path, async function (err) {
      if (err) {
        console.log(err);
        return res.status(500).send('Error while saving image');
      }

      const newImage = {
        name: image_name,
        image_type: image.mimetype,
        url: `Uploads/${image_name}`
      };

      const updated_aircraft = await Aircraft.findByIdAndUpdate(
        aircraft_id,
        { $set: { image: newImage } },
        { new: true }
      );

      res.json({ message: 'Image updated successfully', aircraft: updated_aircraft });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong. Please try again later.' });
  }
};