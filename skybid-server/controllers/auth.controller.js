const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

exports.register = async (req,res) => {
    const {company_name, email, password, country, address, website, city, bio, phone,role} = req.body

    const existing_user = await User.findone({email});

    if (existing_user) return res.status(409).json({message: 'Email already exists'});

    const user = new User();
     user.company_name = company_name;
     user.email = email;
     user.password = password;
     user.country = country;
     user.address = address;
     user.website = website;
     user.city = city;
     user.bio = bio;
     user.phone = phone;
     user.role = role;

     await user.save();
     
     const {password: hashedPassword, ...newUser} = user.toJSON();
     res.status(200).json(newUser)

}