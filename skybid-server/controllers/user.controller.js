const Request = require("../models/requestModel");
const User = require("../models/userModel");

exports.updateProfile = async (req, res) => {
    const user_id = req.user._id;
    const { company_name, email, password, country, address, website, city, bio, phone, role } = req.body;

    try {

        const profile = await User.findById(user_id);
        if (!profile) return res.json({ error: "User not found" })
        profile.company_name = company_name;
        profile.email = email;
        profile.password = password;
        profile.country = country;
        profile.address = address;
        profile.website = website;
        profile.city = city;
        profile.bio = bio;
        profile.phone = phone;
        profile.role = role
        await profile.save()
        const {password: hashed_password, ...new_profile} = profile.toJSON()
        return res.json({
            message: "Profile updated succesfully",
            new_profile
        });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.getUser = async (req,res) => {

   const user_id = req.params.id
    if(!user_id) return res.json(" Invalid user ID")

    const user = await User.findOne({_id : user_id})

    if (!user) return res.json("User not found")

    return res.json(user)
}

exports.getRequest = async (req,res) => {

   const request_id = req.params.id
    if(!request_id) return res.json(" Invalid request ID")

    const request = await Request.findOne({_id : request_id})

    if (!request) return res.json("User not found")

    return res.json(request)

}