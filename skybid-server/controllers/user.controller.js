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