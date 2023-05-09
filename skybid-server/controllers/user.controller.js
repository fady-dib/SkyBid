const Request = require("../models/requestModel");
const User = require("../models/userModel");

exports.updateProfile = async (req, res) => {
    const user_id = req.user._id;
    const { company_name, email, password, country, address, city, bio, phone, role } = req.body;

    try {
        const profile = await User.findById(user_id);
        if (!profile) return res.json({ error: "User not found" });

        if (company_name && company_name !== profile.company_name) profile.company_name = company_name;
        if (email && email !== profile.email) profile.email = email;
        if (password && password !== profile.password) profile.password = password;
        if (country && country !== profile.country) profile.country = country;
        if (address && address !== profile.address) profile.address = address;
        if (city && city !== profile.city) profile.city = city;
        if (bio && bio !== profile.bio) profile.bio = bio;
        if (phone && phone !== profile.phone) profile.phone = phone;
        if (role && role !== profile.role) profile.role = role;

        await profile.save();
        const {password: hashed_password, ...new_profile} = profile.toJSON();
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

   const user_id = req.user._id
    if(!user_id) return res.json(" Invalid user ID")

    const user = await User.findOne({_id : user_id}).select('-password')

    if (!user) return res.json("User not found")

    return res.json(user)
}

exports.getRequests = async (req,res) => {
    const Requests = await Request.find({status: 'pending'}).populate("broker","-password")
    return res.json(Requests)
}

exports.getBidsByRequestID = async (req,res) => {

    const request_id = req.body.request_id
    if(!request_id) return res.json(" Invalid request ID")

    const request = await Request.findOne({_id: request_id})
    if (!request) return res.json("Request not found")
    
    if (!request.bids) return res.json("No available bids on this request")
    return res.json(request.bids)

}

exports.getRequestsByBroker = async (req,res) => {
    
    try{
    const user_id = req.user._id;
    const requests = await Request.find({broker : user_id , status : 'pending'})
    if (!requests || requests == null || requests.length == 0) return res.json([])

    return res.json(requests)

}catch (error) {
        res.status(500).json({ error: error.message });
    }

}



exports.getRequest = async (req,res) => {

   const request_id = req.params.id
    if(!request_id) return res.json(" Invalid request ID")

    const request = await Request.findOne({_id : request_id}).populate("broker").populate("bids.aircraft").populate("bids.operator")

    if (!request) return res.json("Request not found")

    return res.json(request)

}

exports.deleteRequest = async (req,res) => {

    const request_id = req.params.id;
    if(!request_id) return res.json(" Invalid request ID")

    try {
        const deleted_request = await Request.findByIdAndDelete(request_id);
        if (!deleted_request) {
          return res.status(404).json("Request not found");
        }

        return res.status(200).json({ message: "Request deleted successfully" });

      } catch (error) {
        return res.status(500).json({ message: "Error deleting request", error });
      }
    

}

exports.updateRequest = async (req,res) => {
    const request_id = req.body.request_id;
    if(!request_id) return res.json(" Invalid request ID")

    try {
        const update_request = await Request.findOneAndUpdate(
            {_id : request_id},
            {$set : {status: 'closed'}}
        );
        if (!update_request) {
          return res.status(404).json("Request not found");
        }

        return res.status(200).json({ message: "Request closed" });

      } catch (error) {
        return res.status(500).json({ message: "Error updating request", error });
      }
}