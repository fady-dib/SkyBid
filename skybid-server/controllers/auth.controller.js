const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

exports.register = async (req,res) => {
    const {company_name, email, password, country, address, website, city, bio, phone,role} = req.body

    const existing_user = await User.findOne({email});

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

     const {password: hashedPassword, ...new_user} = user.toJSON();
     res.status(200).json(new_user)

}

exports.login = async(req,res) => {
    const{email, password} = req.body;

    const existing_user = await User.findOne({email});
    

    if(!existing_user) return res.status(400).json({message: "Invalid credentials"});

    const is_matched = await existing_user.matchPassword(password);

    if (!is_matched) return res.status(400).json({message:"Invalid credentials"});

    const token = jwt.sign({ id : existing_user._id, email: existing_user.email}, process.env.SECRET_KEY);
    role = existing_user.role

    res.json({token :token, role:role})
}